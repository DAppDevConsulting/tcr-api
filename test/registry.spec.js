import { Registry, PLCRVoting } from '../lib/tcr';
import Web3 from 'web3';

const assert = require('assert');
const secrets = require('../src/secrets.json');

let registryAddress = secrets.registry;
let provider = new Web3('http://localhost:7545');

let registry, account, accountExtra, parameterizer, accounts;

const sleep = (seconds) => (new Promise((resolve, reject) => setTimeout(resolve, seconds * 1000)));

const getRandInt = (min, max) => (Math.floor(Math.random() * (max - min)) + min);

describe('TCR', () => {
  let listingName;

  before(async () => {
    // Settings the default address in case it's empty
    accounts = await provider.eth.getAccounts();
    provider.eth.defaultAccount = accounts[0];

    // Settings the default entities
    registry = new Registry(registryAddress, provider);
    account = await registry.getAccount(await provider.eth.getCoinbase());
    accountExtra = await registry.getAccount(accounts[1]);
    parameterizer = await registry.getParameterizer();

    listingName = Math.random(10000).toString(); // Pseudo random listing name to avoid collisions
  });

  describe('Account', () => {
    before(async () => {
    });

    it('can pre-approve tokens', async () => {
      let amount = '20';

      await account.approveTokens(registry.address, amount);

      assert.strictEqual(amount, await account.getApprovedTokens(registry.address));
    });
  });

  describe('Parameterizer', () => {
    it('should return any string param', async () => {
      assert.strictEqual(typeof await parameterizer.get('minDeposit'), 'string');
    });
  });

  describe('Registry', () => {
    let minDeposit, stake, depositAmount;

    before(async () => {
      let amount = 0;

      /* Calculating tokens amount for applying pre-approving */
      minDeposit = parseInt(await parameterizer.get('minDeposit'), 10);
      let addition = minDeposit * Number(Math.random(0.2).toFixed()); // Addition from 0% to 20% to minDeposit

      stake = minDeposit + addition;
      amount += stake;

      /* Calculating tokens amount for deposit pre-approving */
      depositAmount = 10000;
      amount += depositAmount;

      account.approveTokens(registry.address, amount);

      /* Approving min deposit tokens to extra account */
      accountExtra.approveTokens(registry.address, minDeposit * 10);
    });

    it('should be able to create a listing', async () => {
      let listing = await registry.createListing(listingName, stake, {gas: 150000});

      assert(await registry.hasListing(listingName));
      assert.strictEqual(await listing.getStageStatus(), null);
    });

    it('should be able to increase and decrease listing deposit', async () => {
      let listing = registry.getListing(listingName);
      let deposit = await listing.getDeposit();

      await listing.deposit(depositAmount);
      assert.strictEqual(await listing.getDeposit(), deposit + depositAmount);

      await listing.withdraw(depositAmount);
      assert.strictEqual(await listing.getDeposit(), deposit);
    });

    it('should be able to challenge listing', async () => {
      let listing = registry.getListing(listingName);

      assert(!await listing.hasChallenge());

      await listing.challenge({from: accountExtra.owner, gas: 400000});

      assert(await listing.hasChallenge());
    });

    // @todo: not ready yet, need to implement challenge functionality
    it('should be able to remove listing (quit from registry)', async () => {
      return;
      let listing = registry.getListing(listingName);

      // Checking that the listing is in registry and whitelisted
      assert(await listing.exists());
      assert(await listing.isWhitelisted());

      await listing.remove();
      assert(!await listing.exists());
    });
  });

  describe('PLCR Voting', () => {
    let listing, challenge, plcr, salt, option, depositAmount;

    before(async () => {
      listing = registry.getListing(listingName);
      challenge = await listing.getChallenge();
      plcr = await registry.getPLCRVoting();

      salt = getRandInt(1000, 9999);
      option = 1;
      depositAmount = 20000;

      // Pre-approving tokens for further working
      account.approveTokens(plcr.address, 100000);
      accountExtra.approveTokens(plcr.address, 100000);

      // Pre-requesting voting rights
      await plcr.requestVotingRights(depositAmount, {from: accountExtra.owner});
    });

    it('should be able to request/withdraw voting rights', async () => {
      let initialTokenBalance = await plcr.getTokenBalance(account.owner);
      let amount = 5000;

      await plcr.requestVotingRights(amount);
      assert.strictEqual(initialTokenBalance + amount, await plcr.getTokenBalance(account.owner));

      await plcr.withdrawVotingRights(amount);
      assert.strictEqual(initialTokenBalance, await plcr.getTokenBalance(account.owner));
    });

    it('should be able to commit a vote', async () => {
      let poll = await challenge.getPoll();
      let secretHash = PLCRVoting.makeSecretHash(option, salt);

      assert.strictEqual(await listing.getStageStatus(), 'VoteCommit');

      assert(await poll.isCommitStage());

      await poll.commitVote(secretHash, depositAmount, {from: accountExtra.owner, gas: 150000});
      await sleep((await poll.getCommitRemainingTime()) + 1);
    });

    it('should be able to reveal a vote', async () => {
      let poll = await challenge.getPoll();

      // Just a stub to mine a new block with new timestamp
      await plcr.requestVotingRights(20000, {from: accounts[3]});

      assert(!await poll.isCommitStage() && await poll.isRevealStage());
      assert.strictEqual(await listing.getStageStatus(), 'VoteReveal');

      await poll.revealVote(option, salt, {from: accountExtra.owner, gas: 150000});

      await sleep((await poll.getRevealRemainingTime()) + 1);
    });

    it('should display the correct number of votes after reveal phase', async () => {
      let poll = await challenge.getPoll();

      assert.strictEqual(await poll.getVotesFor(), depositAmount);

      await sleep((await poll.getRevealRemainingTime()) + 1);
    });

    it('should be able to resolve challenge and update listing status', async () => {
      let poll = await challenge.getPoll();

      // Just a stub to mine a new block with new timestamp
      await plcr.requestVotingRights(20000, {from: accounts[2]});
      assert.strictEqual(await listing.getStageStatus(), 'NeedRefresh');

      await listing.updateStatus({gas: 150000});

      assert(await poll.isEnded() && await challenge.isResolved());
    });

    it('should be able to receive the reward', async () => {
      await challenge.claimReward(salt, {from: accountExtra.owner, gas: 150000});
    });
  });

  describe('Parameterizer', () => {
    let param, value, option, salt, plcr, challengeId;

    before(async () => {
      param = 'minDeposit';
      value = '400';
      option = 1;
      salt = 1111;
      plcr = await parameterizer.getPLCRVoting();
      challengeId = 0;

      // Pre-approving tokens for further working
      account.approveTokens(parameterizer.address, 1000000);
      accountExtra.approveTokens(parameterizer.address, 1000000);
    });

    it('Should be able to propose a reparameterization', async () => {
      let proposal = await parameterizer.createProposal(param, value, {gasLimit: 200000});

      assert(proposal.exists());

      assert.strictEqual(await proposal.getStageStatus(), null);
    });

    it('should be able to challenge proposal', async () => {
      let proposal = parameterizer.getProposal(param, value);

      assert(!await proposal.hasChallenge());

      let challenge = await proposal.challenge({from: accountExtra.owner, gas: 400000});

      assert(await proposal.hasChallenge());

      challengeId = challenge.id;
    });

    it('should be able to pass PLCR voting', async () => {
      let proposal = parameterizer.getProposal(param, value);
      let challenge = parameterizer.getChallenge(challengeId);
      let poll = await challenge.getPoll();
      let secretHash = PLCRVoting.makeSecretHash(option, salt);
      let depositAmount = 20000;

      // Pre-approving tokens for further working
      await account.approveTokens(plcr.address, 100000);
      await accountExtra.approveTokens(plcr.address, 100000);
      await plcr.requestVotingRights(depositAmount, {from: accountExtra.owner});

      // assert.strictEqual(await proposal.getStageStatus(), 'VoteCommit');

      /* Commit stage */
      assert(await poll.isCommitStage());
      assert.strictEqual(await proposal.getStageStatus(), 'VoteCommit');

      await poll.commitVote(secretHash, depositAmount, {from: accountExtra.owner, gas: 150000});
      await sleep((await poll.getCommitRemainingTime()) + 1);

      /* Reveal stage */
      // Just a stub to mine a new block with new timestamp
      await plcr.requestVotingRights(20000, {from: accounts[0]});

      assert(!await poll.isCommitStage() && await poll.isRevealStage());
      assert.strictEqual(await proposal.getStageStatus(), 'VoteReveal');

      await poll.revealVote(option, salt, {from: accountExtra.owner, gas: 150000});

      await sleep((await poll.getRevealRemainingTime()) + 1);
    });

    it('should be able to resolve challenge and process proposal', async () => {
      let proposal = await parameterizer.getProposal(param, value);
      let challenge = await proposal.getChallenge();
      let poll = await challenge.getPoll();

      // Just a stub to mine a new block with new timestamp
      await plcr.requestVotingRights(20000, {from: accounts[0]});

      assert.strictEqual(await proposal.getStageStatus(), 'NeedProcess');

      await proposal.process({gas: 150000});

      assert(await poll.isEnded() && await challenge.isResolved());
    });

    it('should be able to receive the reward', async () => {
      let challenge = parameterizer.getChallenge(challengeId);

      await challenge.claimReward(salt, {from: accountExtra.owner, gas: 150000});
    });
  });

});

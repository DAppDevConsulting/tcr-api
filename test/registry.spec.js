import { Registry, Listing } from '../lib/tcr';
import Web3 from 'web3';

const assert = require('assert');
const secrets = require('../src/secrets.json');

let registryAddress = secrets.registry;
let provider = new Web3('http://localhost:7545');

let registry, account, accountExtra, parameterizer, accounts;

describe('TCR', () => {
  before(async () => {
    // Settings the default address in case it's empty
    accounts = await provider.eth.getAccounts();
    provider.eth.defaultAccount = accounts[0];

    // Settings the default entities
    registry = new Registry(registryAddress, provider);
    account = await registry.getAccount(await provider.eth.getCoinbase());
    accountExtra = await registry.getAccount(accounts[1]);
    parameterizer = await registry.getParameterizer();
  });

  describe('Account', () => {
    before(async () => {
    });

    it('can pre-approve tokens', async () => {
      let amount = '20';
      await account.approveTokens(registry.address, amount);

      assert.strictEqual(amount, await account.getApprovedTokens(registry.address));
    })
  });

  describe('Parameterizer', () => {
    it('should return any string param', async () => {
      assert.strictEqual(typeof await parameterizer.get('minDeposit'), 'string');
    })
  });

  describe('Registry', () => {
    let minDeposit, stake, listingName, depositAmount;

    before(async () => {
      let amount = 0;

      /* Calculating tokens amount for applying pre-approving */
      minDeposit = parseInt(await parameterizer.get('minDeposit'));
      let addition = minDeposit * Number(Math.random(0.2).toFixed()); // Addition from 0% to 20% to minDeposit
      stake = minDeposit + addition;
      amount += stake;

      /* Calculating tokens amount for deposit pre-approving */
      depositAmount = 10000;
      amount += depositAmount;

      account.approveTokens(registry.address, amount);

      /* Approving min deposit tokens to extra account */
      accountExtra.approveTokens(registry.address, minDeposit * 10)
    });

    it('should be able to create a listing', async () => {
      listingName = Math.random(10000).toString();   // Pseudo random listing name to avoid collisions
      await registry.createListing(listingName, stake, {gas: 150000});

      assert(await registry.hasListing(listingName))
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
    });

    // @todo: not ready yet, need to implement challenge functionality
    it('should be able to remove listing (quit from registry)', async () => {
      let listing = registry.getListing(listingName);

      // Checking that the listing is in registry and whitelisted
      assert(await listing.exists());
      assert(await listing.isWhitelisted());

      await listing.remove();
      assert(!await listing.exists());
    })
  });
});
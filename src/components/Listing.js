import web3Utils from 'web3-utils';
import { stubAddress } from './utils';
import Component from './Component';
import Challenge from './Challenge';

class Listing extends Component {
  constructor(hash, registry) {
    super(registry.provider);

    this.hash = hash;
    this.registry = registry;
    this.contract = registry.contract;
  }

  async getOwner() {
    let data = await this._getData();

    return data['owner'] === stubAddress() ? null : data['owner'];
  }

  async getStageStatus() {
    let challenge = await this.getChallenge();
    let poll = await challenge.getPoll();

    if (await this.hasChallenge() && await poll.exists()) {
      switch (await poll.getCurrentStage()) {
        case 'commit':
          return 'VoteCommit';
        case 'reveal':
          return 'VoteReveal';
      }
    }

    if (await this.canBeWhitelisted() || await challenge.canBeResolved()) {
      return 'NeedRefresh';
    }

    return null;
  }

  async isWhitelisted() {
    let data = await this._getData();

    return data['whitelisted'] === true;
  }

  canBeWhitelisted() {
    return this.contract.methods.canBeWhitelisted(this.hash).call();
  }

  async getChallenge() {
    let data = await this._getData();

    return new Challenge(data['challengeID'], this.registry);
  }

  async getChallengeId() {
    let data = await this._getData();

    return data['challengeID'];
  }

  async hasChallenge() {
    let data = await this._getData();

    return data['challengeID'] !== '0';
  }

  async expiresAt() {
    let data = await this._getData();

    return parseInt(data['applicationExpiry'], 10);
  }

  async getDeposit() {
    let data = await this._getData();

    return parseInt(data['unstakedDeposit'], 10);
  }

  exists() {
    // Listing cannot exists without owner, therefore we use this to validate existence
    return this.contract.methods.appWasMade(this.hash).call();
  }

  async getData() {
    return {
      'owner': await this.getOwner(),
      'isWhitelisted': await this.isWhitelisted(),
      'exists': await this.exists(),
      'deposit': await this.getDeposit()
    };
  }

  async challenge(sendObj = {}) {
    await this.send(this.contract.methods.challenge, this.hash, 'wow', sendObj);

    return this.getChallenge();
  }

  updateStatus(sendObj = {}) {
    return this.send(this.contract.methods.updateStatus, this.hash, sendObj);
  }

  deposit(amount, sendObj = {}) {
    return this.send(this.contract.methods.deposit, this.hash, amount, sendObj);
  }

  withdraw(amount, sendObj = {}) {
    return this.send(this.contract.methods.withdraw, this.hash, amount, sendObj);
  }

  remove(sendObj = {}) {
    return this.send(this.contract.methods.exit, this.hash, sendObj);
  }

  /* Returns a raw data */
  _getData() {
    return this.contract.methods.listings(this.hash).call();
  }

  static hashName(name) {
    return web3Utils.keccak256(name);
  }
}

export default Listing;

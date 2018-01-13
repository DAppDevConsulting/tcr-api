import { keccak256 } from 'js-sha3';
import { stubAddress } from './utils';
import Component from './Component';
import ChallengeFactory from './ChallengeFactory';

const OWNER = 'owner';
const APPLICATION_EXPIRY = 'applicationExpiry';
const WHITELISTED = 'whitelisted';
const UNSTAKED_DEPOSIT = 'unstakedDeposit';
const CHALLENGE_ID = 'challengeID';

class Listing extends Component {
  constructor(name, rawDataFromContract, provider, contract) {
    super(provider);

    this.name = name;
    this._rawData = rawDataFromContract;
    this.contract = contract;
    this._challengeFactory = new ChallengeFactory(provider, contract);
  }

  getOwner() {
    return this._property(OWNER) === stubAddress() ? null : this._property(OWNER);
  }

  isWhitelisted() {
    return this._property(WHITELISTED) === true;
  }

  getChallenge() {
    return this._challengeFactory.create(this._property(CHALLENGE_ID));
  }

  hasChallenge() {
    return this._property(CHALLENGE_ID) !== '0';
  }

  expiresAt() {
    return parseInt(this._property(APPLICATION_EXPIRY), 10);
  }

  getDeposit() {
    return parseInt(this._property(UNSTAKED_DEPOSIT), 10);
  }

  exists() {
    // Listing cannot exists without owner, therefore we use this to validate existence
    return this._rawData['exists'];
  }

  getData() {
    return {
      'name': this.name,
      'owner': this.getOwner(),
      'isWhitelisted': this.isWhitelisted(),
      'exists': this.exists(),
      'deposit': this.getDeposit()
    };
  }

  // TODO: предусмотреть эксепшен, т.к. данные точно уже неактуальны после этого вызова
  async challenge(sendObj = {}) {
    let challengeId = await this.send(this.contract.methods.challenge, this.name, sendObj);

    return this._challengeFactory.create(challengeId);
  }

  deposit(amount, sendObj = {}) {
    return this.send(this.contract.methods.deposit, this.name, amount, sendObj);
  }

  withdraw(amount, sendObj = {}) {
    return this.send(this.contract.methods.withdraw, this.name, amount, sendObj);
  }

  remove(sendObj = {}) {
    return this.send(this.contract.methods.exit, this.name, sendObj);
  }

  _property(propName) {
    return this._rawData[propName];
  }

  static hashName(name) {
    return '0x' + keccak256(name);
  }
}

export default Listing;

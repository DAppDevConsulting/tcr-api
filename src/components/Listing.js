import { keccak256 } from 'js-sha3';
import { stubAddress } from './utils';
import Component from './Component';
import Challenge from './Challenge';

class Listing extends Component {
  constructor(name, registry) {
    super(registry.provider);

    this.name = name;
    this.registry = registry;
    this.contract = registry.contract;
  }

  async getOwner() {
    let data = await this._getData();

    return data['owner'] === stubAddress() ? null : data['owner'];
  }

  async isWhitelisted() {
    let data = await this._getData();

    return data['whitelisted'] === true;
  }

  async getChallenge() {
    let data = await this._getData();

    return new Challenge(data['challengeID'], this.registry);
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

  async exists() {
    // Listing cannot exists without owner, therefore we use this to validate existence
    return await this.contract.methods.appWasMade(this.name).call();
  }

  async getData() {
    return {
      'name': this.name,
      'owner': await this.getOwner(),
      'isWhitelisted': await this.isWhitelisted(),
      'exists': await this.exists(),
      'deposit': await this.getDeposit()
    };
  }

  async challenge(sendObj = {}) {
    let challengeId = await this.send(this.contract.methods.challenge, this.name, sendObj);

    return new Challenge(challengeId, this.registry);
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

  /* Returns a raw data */
  _getData() {
    return this.contract.methods.listings(Listing.hashName(this.name)).call();
  }

  static hashName(name) {
    return '0x' + keccak256(name);
  }
}

export default Listing;

import { contract } from './utils';
import Component from './Component';
import Account from './Account';
import Parameterizer from './Parameterizer';
import Listing from './Listing';
import PLCRVoting from './PLCRVoting';
import Challenge from './Challenge';

class Registry extends Component {
  constructor(address, provider) {
    super(provider);

    this.address = address;
    this.contract = contract('Registry', address, provider);
  }

  async createListing(hash, amount, data, _sendObj = {}) {
    await this.send(this.contract.methods.apply, hash, amount, data, _sendObj);

    return new Listing(hash, this);
  }

  getListing(hash) {
    return new Listing(hash, this);
  }

  getChallenge(id) {
    return new Challenge(id, this);
  }

  hasListing(hash) {
    return this.getListing(hash).exists();
  }

  async getPLCRVoting() {
    let PLCRVotingAddress = await this.contract.methods.voting().call();

    return new PLCRVoting(PLCRVotingAddress, this.provider);
  }

  async getAccount(owner) {
    let tokenAddress = await this.contract.methods.token().call();

    return new Account(owner, tokenAddress, this.provider);
  }

  async getParameterizer() {
    let parameterizerAddress = await this.contract.methods.parameterizer().call();

    return new Parameterizer(parameterizerAddress, this.provider);
  }
}

export default Registry;

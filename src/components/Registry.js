import { contract } from './utils';
import Component from './Component';
import Account from './Account';
import Parameterizer from './Parameterizer';
import Listing from './Listing';

class Registry extends Component {
  constructor(address, provider) {
    super(provider);

    this.address = address;
    this.contract = contract('Registry', address, provider);
  }

  async createListing(name, amount, _sendObj = {}) {
    await this.send(this.contract.methods.apply, name, amount, _sendObj);

    return new Listing(name, this);
  }

  getListing(name) {
    return new Listing(name, this);
  }

  hasListing(name) {
    return this.getListing(name).exists();
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

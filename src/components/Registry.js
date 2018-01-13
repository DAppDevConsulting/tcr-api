import { contract } from './utils';
import Component from './Component';
import Account from './Account';
import Parameterizer from './Parameterizer';
import ListingFactory from './ListingFactory';

class Registry extends Component {
  constructor(address, provider) {
    super(provider);

    this.address = address;
    this.contract = contract('Registry', address, provider);
    this._listingFactory = new ListingFactory(provider, this.contract);
  }

  async createListing(name, amount, _sendObj = {}) {
    await this.send(this.contract.methods.apply, name, amount, _sendObj);

    return await this.getListing(name);
  }

  async getListing(name) {
    return await this._listingFactory.create(name);
  }

  async hasListing(name) {
    return await (await this.getListing(name)).exists();
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

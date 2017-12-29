import { contract } from './contracts';
import Account from './Account';

class Registry {
  constructor(address, provider) {
    this.address = address;
    this.provider = provider;
    this.contract = contract('Registry', address, provider);
  }

  async getAccount(address) {
    let tokenAddress = await this.contract.methods.token().call();

    return new Account(address, tokenAddress, this.provider);
  }
}

export default Registry;

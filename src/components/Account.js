import { contract } from './contracts'

class Account {
  constructor(address, tokenAddress, provider) {
    this.address = address;
    this.provider = provider;
    this.tokenContract = contract('StandardToken', tokenAddress, provider);
  }

  getTokenBalance() {
    return this.tokenContract.methods.balanceOf(this.address).call();
  }

  getEtherBalance() {
    return this.provider.eth.getBalance(this.address);
  }
}

export default Account;
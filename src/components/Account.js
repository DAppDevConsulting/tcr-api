import { contract } from './utils';
import Component from './Component';

class Account extends Component {
  constructor(owner, address, provider) {
    super(provider);

    this.owner = owner;
    this.address = address;
    this.tokenContract = contract('StandardToken', address, provider);
  }

  getTokenBalance() {
    return this.tokenContract.methods.balanceOf(this.owner).call();
  }

  getEtherBalance() {
    return this.provider.eth.getBalance(this.owner);
  }

  approveTokens(spender, amount, sendObj = {from: this.owner}) {
    return this.send(this.tokenContract.methods.approve, spender, amount, sendObj);
  }

  getApprovedTokens(spender, owner = this.owner) {
    return this.tokenContract.methods.allowance(owner, spender).call();
  }
}

export default Account;

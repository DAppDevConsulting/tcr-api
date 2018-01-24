import { keccak256 } from 'js-sha3';
import { contract } from "./utils"

import Poll from './Poll'
import Component from './Component'

class PLCRVoting extends Component {
  constructor(address, provider) {
    super(provider);

    this.contract = contract('PLCRVoting', address, provider);
    this.address = address;
  }

  getPoll(id) {
    return new Poll(id, this);
  }

  requestVotingRights(amount, _sendObj = {}) {
    return this.send(this.contract.methods.requestVotingRights, amount, _sendObj);
  }

  withdrawVotingRights(amount, _sendObj = {}) {
    return this.send(this.contract.methods.withdrawVotingRights, amount, _sendObj);
  }

  async getTokenBalance(address) {
    return parseInt(await this.contract.methods.voteTokenBalance(address).call());
  }

  static makeSecretHash(option, salt) {
    return '0x' + keccak256(option.toString() + salt.toString());
  }
}

export default PLCRVoting;

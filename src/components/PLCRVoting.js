import web3Utils from 'web3-utils';
import { contract } from './utils';

import Poll from './Poll';
import Component from './Component';

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
    // TODO: m.b. big number?
    return parseInt(await this.contract.methods.voteTokenBalance(address).call(), 10);
  }

  async getCommitHash(address, pollId) {
    return await this.contract.methods.getCommitHash(address, pollId).call();
  }

  async hasBeenRevealed(address, pollId) {
    return await this.contract.methods.hasBeenRevealed(address, pollId).call();
  }

  static makeSecretHash(option, salt) {
    return web3Utils.soliditySha3(option, salt);
  }
}

export default PLCRVoting;

import { contract } from './utils';
import Component from './Component';
import Proposal from './Proposal';
import PLCRVoting from './PLCRVoting';
import Challenge from './Challenge';

class Parameterizer extends Component {
  constructor(address, provider) {
    super(provider);

    this.address = address;
    this.contract = contract('Parameterizer', address, provider);
  }

  async createProposal(name, value, sendObj = {}) {
    await this.send(this.contract.methods.proposeReparameterization, name, value, sendObj);

    return this.getProposal(name, value);
  }

  getProposal(name, value) {
    return new Proposal(Proposal.hashNameAndValue(name, value), this);
  }

  getChallenge(id) {
    return new Challenge(id, this);
  }

  async getPLCRVoting() {
    let PLCRVotingAddress = await this.contract.methods.voting().call();

    return new PLCRVoting(PLCRVotingAddress, this.provider);
  }

  get(param) {
    return this.contract.methods.get(param).call();
  }
}

export default Parameterizer;

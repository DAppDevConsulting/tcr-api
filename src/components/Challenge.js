import Component from './Component';
import PLCRVoting from './PLCRVoting';

class Challenge extends Component {
  constructor(id, registry) {
    super(registry.provider);

    this.id = id;
    this.registry = registry;
    // this.contract = registry.contract;
  }

  getWinnerReward() {
    return this.registry.contract.methods.challengeWinnerReward(this.id).call();
  }

  async getPoll() {
    let voting = await this.registry.getPLCRVoting();

    return voting.getPoll(this.id, voting);
  }
}

export default Challenge;

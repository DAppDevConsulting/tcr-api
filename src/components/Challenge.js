import Component from './Component';

class Challenge extends Component {
  constructor(id, registry) {
    super(registry.provider);

    this.id = id;
    this.registry = registry;
    this.contract = registry.contract;
  }

  getWinnerPartyReward() {
    return this.contract.methods.challengeWinnerReward(this.id).call();
  }

  async canBeResolved() {
    let isResolved = await this.isResolved();

    if (isResolved) {
      return false;
    }

    let poll = await this.getPoll();

    return await poll.exists() ? await poll.isEnded() : false;
  }

  getVoterReward(voter, salt) {
    return this.contract.methods.voterReward(voter, this.id, salt).call();
  }

  claimReward(salt, sendObj = {}) {
    return this.send(this.contract.methods.claimReward, this.id, salt, sendObj);
  }

  async getPoll() {
    let voting = await this.registry.getPLCRVoting();

    return voting.getPoll(this.id, voting);
  }

  async isResolved() {
    let data = await this._getData();

    return data['resolved'];
  }

  async getData() {
    return {
      id: this.id,
      isResolved: await this.isResolved()
    };
  }

  _getData() {
    return this.contract.methods.challenges(this.id).call();
  }
}

export default Challenge;

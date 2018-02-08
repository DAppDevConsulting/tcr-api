import Component from './Component';

class Challenge extends Component {
  constructor(id, listing) {
    super(listing.provider);

    this.id = id;
    this.listing = listing;
    this.registry = listing.registry;
    this.contract = listing.contract;
  }

  getWinnerPartyReward() {
    return this.contract.methods.challengeWinnerReward(this.id).call();
  }

  exists() {
    return this.contract.methods.challengeExists(this.listing.hash).call();
  }

  async canBeResolved() {
    return await this.exists() && await this.contract.methods.challengeCanBeResolved(this.listing.hash).call();
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

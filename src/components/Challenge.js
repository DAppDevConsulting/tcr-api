import Component from './Component';

class Challenge extends Component {
  constructor(id, rawDataFromContract, provider, contract) {
    super(provider);

    this.id = id;
    this._rawData = rawDataFromContract;
    this.contract = contract;
  }

  getWinnerReward() {
    return this.contract.methods.challengeWinnerReward(this.id).call();
  }
}

export default Challenge;

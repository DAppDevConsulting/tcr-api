import { contract } from './utils';
import Component from './Component';

class Challenge extends Component {
  constructor(id, registry) {
    super(registry.provider);

    this.id = id;
    this.registry = registry;
    this.contract = registry.contract;
  }

  getWinnerReward() {
    return this.contract.methods.challengeWinnerReward(this.id).call();
  }
}

export default Challenge;

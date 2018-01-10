import { contract } from './utils';
import Component from './Component';

class Parameterizer extends Component {
  constructor(address, provider) {
    super(provider);

    this.address = address;
    this.contract = contract('Parameterizer', address, provider);
  }

  get(param) {
    return this.contract.methods.get(param).call();
  }
}

export default Parameterizer;

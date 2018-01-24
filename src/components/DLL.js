import Component from './Component'

class DLL extends Component {
  constructor(userAddress, contract, provider) {
    super(provider);

    this.contract = contract;
    this.userAddress = userAddress;
  }

  async getNodeData(id) {
    let data = await this._getNodeData(id);

    return {

    }
  }

  _getNodeData(id) {

  }
}
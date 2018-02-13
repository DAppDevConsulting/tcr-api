import Component from './Component';
import Challenge from './Challenge';
import web3Utils from 'web3-utils';
import { stubAddress } from './utils';

class Proposal extends Component {
  constructor(id, parameterizer) {
    super(parameterizer.provider);

    this.id = id;
    this.parameterizer = parameterizer;
    this.contract = parameterizer.contract;
  }

  async challenge(sendObj = {}) {
    await this.send(this.contract.methods.challengeReparameterization, this.id, sendObj);

    return this.getChallenge();
  }

  process(sendObj) {
    return this.send(this.contract.methods.processProposal, this.id, sendObj);
  }

  async getChallenge() {
    return new Challenge(await this.getChallengeId(), this.parameterizer);
  }

  async getChallengeId() {
    let data = await this._getData();

    return data['challengeID'];
  }

  async hasChallenge() {
    let data = await this._getData();

    return data['challengeID'] !== '0';
  }

  async getStageStatus() {
    let challenge = await this.getChallenge();
    let poll = await challenge.getPoll();

    if (await this.hasChallenge() && await poll.exists()) {
      switch (await poll.getCurrentStage()) {
        case 'commit':
          return 'VoteCommit';
        case 'reveal':
          return 'VoteReveal';
      }
    }

    if (await this.canBeSet() || await challenge.canBeResolved()) {
      return 'NeedProcess';
    }

    return null;
  }

  async exists() {
    return await this.getOwner() !== stubAddress();
  }

  canBeSet() {
    return this.contract.methods.canBeSet(this.id).call();
  }

  async getOwner() {
    let data = await this._getData();

    return data.owner;
  }

  async expiresAt() {
    let data = await this._getData();

    return data.appExpiry;
  }

  async processedBy() {
    let data = await this._getData();

    return data.processedBy;
  }

  async getDeposit() {
    let data = await this._getData();

    return data.deposit;
  }

  async getName() {
    let data = await this._getData();

    return data.name;
  }

  async getValue() {
    let data = await this._getData();

    return data.value;
  }

  async getData() {
    return {
      'id': this.id,
      'name': await this.getName(),
      'value': await this.getValue(),
      'deposit': await this.getDeposit(),
      'expiresAt': await this.expiresAt(),
      'processedBy': await this.processedBy(),
      'owner': await this.getOwner()
    };
  }

  _getData() {
    return this.contract.methods.proposals(this.id).call();
  }

  static hashNameAndValue(name, value) {
    return web3Utils.soliditySha3(name, value);
  }
}

export default Proposal;

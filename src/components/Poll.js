import Component from './Component';

class Poll extends Component {
  constructor(id, plcr) {
    super(plcr.provider);

    this.id = id;
    this.contract = plcr.contract;
    this.plcr = plcr;
  }

  async commitVote(secretHash, stake, _sendObj = {}) {
    let prevPollID = await this.getPointForInsert(this.getSender(_sendObj), stake);

    return this.send(this.contract.methods.commitVote, this.id, secretHash, stake, prevPollID, _sendObj);
  }

  async revealVote(option, salt, _sendObj = {}) {
    return this.send(this.contract.methods.revealVote, this.id, option, salt, _sendObj);
  }

  async getCommitEndDate() {
    let data = await this._getData();

    return parseInt(data['commitEndDate'], 10);
  }

  async getCommitRemainingTime() {
    return await this.getCommitEndDate() - Poll.getCurrentTime();
  }

  async getRevealRemainingTime() {
    return await this.getRevealEndDate() - Poll.getCurrentTime();
  }

  async getRevealEndDate() {
    let data = await this._getData();

    return parseInt(data['revealEndDate'], 10);
  }

  /*
   * Returnes one of the following states: `commit`, `reveal`, `ended`
   */
  async getCurrentStage() {
    if (!await this.exists()) {
      return false;
    }

    if (await this.isCommitStage()) {
      return 'commit';
    } else if (await this.isRevealStage()) {
      return 'reveal';
    } else if (await this.isEnded()) {
      return 'ended';
    }

    return false;
  }

  async getVoteQuorum() {
    let data = await this._getData();

    return parseInt(data['voteQuorum'], 10);
  }

  async getVotesFor() {
    let data = await this._getData();

    return parseInt(data['votesFor'], 10);
  }

  async getVotesAgainst() {
    let data = await this._getData();

    return parseInt(data['votesAgainst'], 10);
  }

  isCommitStage() {
    return this.contract.methods.commitPeriodActive(this.id).call();
  }

  isRevealStage() {
    return this.contract.methods.revealPeriodActive(this.id).call();
  }

  isEnded() {
    return this.contract.methods.pollEnded(this.id).call();
  }

  isPassed() {
    return this.contract.methods.isPassed(this.id).call();
  }

  exists() {
    return this.contract.methods.pollExists(this.id).call();
  }

  async getData() {
    return {
      'id': this.id,
      'commitEndDate': await this.getCommitEndDate(),
      'revealEndDate': await this.getRevealEndDate(),
      'voteQuorum': await this.getVoteQuorum(),
      'votesFor': await this.getVotesFor(),
      'votesAgainst': await this.getVotesAgainst()
    };
  }

  async getPointForInsert(voter, tokensAmount) {
    return parseInt(await this.contract.methods.getInsertPointForNumTokens(voter, tokensAmount).call(), 10);
  }

  _getData() {
    return this.contract.methods.pollMap(this.id).call();
  }

  static getCurrentTime() {
    return Date.now() / 1000 | 0;
  }
}

export default Poll;

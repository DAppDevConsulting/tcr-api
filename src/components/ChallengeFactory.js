import Challenge from './Challenge';

export default class ChallengeFactory {
  constructor(provider, contract) {
    this.provider = provider;
    this.contract = contract;
  }

  // TODO: Async in future
  create(challengeId) {
    return new Challenge(challengeId, {}, this.provider, this.contract);
  }

}

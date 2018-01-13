import Listing from './Listing';

export default class ListingFactory {
  constructor(provider, contract) {
    this.provider = provider;
    this.contract = contract;
  }

  async create(name) {
    const listingRawData = await this.contract.methods.listings(Listing.hashName(this.name)).call();

    // Listing cannot exists without owner, therefore we use this to validate existence
    listingRawData['exists'] = await this.contract.methods.appWasMade(this.name).call();
    return new Listing(name, listingRawData, this.provider, this.contract);
  }

}

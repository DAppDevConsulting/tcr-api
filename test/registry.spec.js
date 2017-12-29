import { Registry } from '../lib/tcr';
import Web3 from 'web3';

const assert = require('assert');

let registryAddress = '0x8cca204fe0a9d9f734f6d05a870eab36f64cce5e';
let provider = new Web3('http://localhost:7545');

let registry = new Registry(registryAddress, provider);
let account;

describe('Account', () => {
  before(async () => {
    account = await registry.getAccount(await provider.eth.getCoinbase());
  });

  it('should have correct amount of tokens', async () => {
    assert.equal(10000000000000000, await account.getTokenBalance())
  })
});
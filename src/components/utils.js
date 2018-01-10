export function contract(name, address, provider) {
  let abi = require(`../contracts/${name}.json`);

  if (!abi) {
    return null;
  }

  return new provider.eth.Contract(abi, address);
}

export function stubAddress() {
  return '0x' + '0'.repeat(40);
}

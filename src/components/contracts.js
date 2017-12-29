export function contract(name, address, provider) {
  let abi = require(`../contracts/${name}.json`);

  if (!abi) {
    return null;
  }

  return new provider.eth.Contract(abi, address);
}

class Component {
  constructor(provider) {
    this.provider = provider;
  }

  send(fn, ...args) {
    // Detecting if last argument is a web3 send object
    let sendObject = (typeof args[args.length - 1] === 'object') ? args.pop() : {};

    if (!sendObject.from) {
      sendObject.from = this.provider.eth.defaultAccount;
    }

    return fn(...args).send(sendObject);
  }
}

export default Component;

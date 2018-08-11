var HDWalletProvider = require("truffle-hdwallet-provider");

//set your mnenomic words to access your test wallet on ropsten
var mnemonic = "select destroy daring tenant exit elbow immense bind dose various lake clinic";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        let provider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/");
        return provider;
      },
      network_id: '3',
    },
  }
};

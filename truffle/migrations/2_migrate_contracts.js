var GreenX = artifacts.require("./GreenX.sol");
var GEXAirDrop = artifacts.require("./GEXAirDrop.sol");

//accounts is the wallet of your ganache-cli generated
//passing option {from: _addr} to specify which account to deploy contract
//GEX and AirDrop are now deployed from 2 different account
module.exports = function(deployer, network, accounts) {
  console.log('Deploying gex using account: ' + accounts[0]);
  deployer.deploy(GreenX, accounts[0], accounts[0], accounts[0], {from: accounts[0]}).
    then( (instance) => {
      console.log('GEX contract address: ' + instance.address);
       //pass the GreenX contract address to GEXAirDrop contract constructor
      console.log('Deploying airdrop using account: ' + accounts[1]);
      return deployer.deploy(GEXAirDrop, instance.address, {from: accounts[1]}).then( instance => {
        console.log('GEX airdrop contract address: ' + instance.address);
      });
    })
};
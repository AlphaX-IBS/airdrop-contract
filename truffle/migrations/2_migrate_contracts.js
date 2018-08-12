var GreenX = artifacts.require("./GreenX.sol");
var GEXAirDrop = artifacts.require("./GEXAirDrop.sol");

module.exports = function(deployer) {
  //this should be the first account of your auto generated ganeche account list 
  console.log('Deploying using admin/owner 0x68ab5366ae21400cdbad9c22def43c0df4114b71');
  deployer.deploy(GreenX, '0x68ab5366ae21400cdbad9c22def43c0df4114b71', '0x68ab5366ae21400cdbad9c22def43c0df4114b71', '0x68ab5366ae21400cdbad9c22def43c0df4114b71').
    then( (instance) => {
      console.log('GEX contract address: ' + instance.address);
       //pass the GreenX contract address to GEXAirDrop contract constructor
      return deployer.deploy(GEXAirDrop, instance.address).then( instance => {
        console.log('GEX airdrop contract address: ' + instance.address);
      });
    })
};
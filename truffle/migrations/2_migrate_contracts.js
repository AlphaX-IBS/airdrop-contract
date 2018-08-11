var GreenX = artifacts.require("./GreenX.sol");
var GEXAirDrop = artifacts.require("./GEXAirDrop.sol");

//migrating contracts in order using promises
module.exports = function(deployer) {
  console.log('Deploying using admin/owner 0xd4a470a3d7A1e4Cd7B8CF634b9dAaA175A0e929B');
  deployer.deploy(GreenX, '0xd4a470a3d7A1e4Cd7B8CF634b9dAaA175A0e929B', '0xd4a470a3d7A1e4Cd7B8CF634b9dAaA175A0e929B', '0xd4a470a3d7A1e4Cd7B8CF634b9dAaA175A0e929B').
    then( (instance) => {
      console.log('GEX contract address: ' + instance.address);
       //pass the GreenX contract address to GEXAirDrop contract constructor
      return deployer.deploy(GEXAirDrop, instance.address).then( instance => {
        console.log('GEX airdrop contract address: ' + instance.address);
      });
    })
};
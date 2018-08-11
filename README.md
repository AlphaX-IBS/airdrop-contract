# airdrop-contract
Smart contract for airdrop solution

## Deployment 
Install `truffle`

`cd truffle`

`npm install` //install web3, truffle-hdwallet-provider

Install private blockchain `ganache-cli`

execute `ganache-cli --db "D:\ChainData" --mnemonic "mammal cherry vacant exist image exchange expose slice garbage damage slab slav" -e 1500`   
to start the block chain (keep the mnemonic and datadir same everytime you start to preserve old data)

execute `truffle deploy`

## /truffle/contracts/GEXAirDrop.sol

This is the solidity script for AirDrop GEX

## Testing

`truffle test test/1_greenx.js`
(currently error at step 5 of test)

## ERROR

if you encounter errors and dont know how to fix, try: 
 - deleting every jsons in `/truffle/build/contracts` (compiled with `truffle compile`)
 - deleting block chain data in `D:\ChainData` or whichever directory you used to store data with ganache
 - rerun `truffle deploy`
var Web3 = require('web3');
var web3 = new Web3("ws://localhost:8545");

var GreenX = artifacts.require("GreenX");
var GEXAirDrop = artifacts.require("GEXAirDrop");

//contract() function deploy new contracts every time this test is ran, `accounts` is a list of accounts created by ganache when init blockchain
contract('GreenX Deployment', (accounts) => {
    var gexContract, airContract;

    it("should deploy contract and progress to end ICO phase", async () => {

        gexContract = await GreenX.deployed();
        //follow deployment steps just as described in the deployment document
        await gexContract.activate();
        assert.equal(await gexContract.inActive.call(), false, 'Activate contract failed');

        await gexContract.enableTokenTransfer();
        assert.equal(await gexContract.isTransferable.call(), true, 'enableTokenTransfer failed');

        await gexContract.setPrivateSalePrice(5000);

        await gexContract.startPrivateSales();

        await gexContract.modifyPrivateList([accounts[0]], true);

        await gexContract.setPreSalePrice(2500);

        await gexContract.startPreSales();

        await gexContract.endPreSales();

        await gexContract.setICOPrice(1500);

        await gexContract.startICO();

        await gexContract.modifyWhiteList([accounts[1]], true);

        //await gexContract.endICO();
    })

    it("should send eth to Contract from " + accounts[0], () => {
        return web3.eth.sendTransaction({
            from: accounts[0],
            to: gexContract.address,
            value: web3.utils.toWei('0.12'),
            gasPrice: web3.utils.toWei('100','gwei'),
            gas: 300000
        }, (err, res) => {
            assert(!err, accounts[0] + 'send transaction failed ' + err);
        })
    })

    // it("should send eth to Contract from " + accounts[1], () => {
    //     return web3.eth.sendTransaction({
    //         from: accounts[1],
    //         to: gexContract.address,
    //         value: web3.utils.toWei('0.12'),
    //         gasPrice: web3.utils.toWei('100','gwei'),
    //         gas: 300000
    //     }, (err, res) => {
    //         assert(!err, accounts[1] + 'send transaction failed: ' + err);
    //     })
    // })

    it("should transfer inside GEX contract", () => {
        return gexContract.transfer(accounts[1], 300).then((result) => {
            assert(result.logs[0].event === 'Transfer', 'No event emitted');
        });
    })

    it("should deploy airdrop", async () => {
        airContract = await GEXAirDrop.deployed();
        assert.equal(await airContract.greenxAdmin.call(), await gexContract.adminAddress.call(), 'Contract is not created by greenx admin');
    })

    //make this a private investor
    it("should make airdrop contract a private investor", async() => {
        await gexContract.modifyPrivateList([airContract.address], true);
    })

    //send some eth to gex contract to increase this airdrop address's balance (balances[]) inside gex contract storage
    it("should deposit some ETHs to newly created airdrop contract address", async () => {
        //0.5 ether (mininum 0.1 ether)
        return airContract.deposit({value: 0.5 * 10 ** 18}).then(result => {
            //console.log(result);
        });
    })

    it("should transfer outside GEX contract to one account", () => {
        return airContract.airDrop(accounts[1], 300).then((result) => {
            //console.log(result);
        })
    })

    it("should transfer outside GEX contract to multiple accounts", () => {
        return airContract.batchAirDrop([accounts[2], accounts[3], accounts[4]], 
            [300, 350, 400]).then((result) => {
            console.log(result);
        })
    })
})
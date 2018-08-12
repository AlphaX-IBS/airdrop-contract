pragma solidity ^0.4.21;

contract IGreenX {
    address public adminAddress;
    function loadFund() public payable;
    function transfer(address _to, uint256 _value) public returns (bool);
}

contract GEXAirDrop {
    IGreenX public greenx;
    address public greenxAdmin;
    
    modifier onlyAdmin {
        //only the greenx admin can execute
        require(greenxAdmin == msg.sender);
        _;
    }
    
    //constructor - take GEX contract address as param
    function GEXAirDrop(address _contract) public {
        //get the current GreenX contract instance by passing address
        greenx = IGreenX(_contract);
        //get the admin address
        greenxAdmin = greenx.adminAddress();
    }

    //an entry function here to receive ETH sent from other normal addresses
    function deposit() external payable {
        //'redirect' the ETH to gex contract
        //call the fallback payable function of GreenX contract (use call instead of transfer, because transfer has a gas limitation)
        //https://medium.com/daox/three-methods-to-transfer-funds-in-ethereum-by-means-of-solidity-5719944ed6e9
        require(address(greenx).call.value(msg.value).gas(100000)());
    }
    
    //TODO: should use transferFrom instead
    function airDrop(address _to, uint256 _amount) public onlyAdmin {
        //the transfer function reduce the balance of msg.sender(in this case - the airdrop contract address)
        //so we must first call deposit to deposit some balance into GEX contract (balances[airdropAddress])
        require(greenx.transfer(_to, _amount));

    }

    //TODO: should use transferFrom instead
    function batchAirDrop(address[] _to, uint256[] _amount) public onlyAdmin {
        uint count = _to.length;
        for(uint i = 0; i < count; i++){
            require(greenx.transfer(_to[i], _amount[i]));
        }
    }
}
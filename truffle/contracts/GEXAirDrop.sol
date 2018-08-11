pragma solidity ^0.4.21;

contract GreenX {
    address public adminAddress;
    function transfer(address _to, uint256 _value) public returns (bool);
}

contract GEXAirDrop {
    GreenX public greenx;
    address public greenxAdmin;
    
    modifier onlyAdmin {
        //only the greenx admin can execute
        require(greenxAdmin == msg.sender);
        _;
    }
    
    //constructor - take GEX contract address as param
    constructor(address _contract) public {
        //get the current GreenX contract instance by passing address
        greenx = GreenX(_contract);
        //get the admin address
        greenxAdmin = greenx.adminAddress();
    }
    
    function batchAirDrop(address[] _to, uint256[] _amount) public /*onlyAdmin*/ {
        uint count = _to.length;
        
        for(uint i = 0; i < count; i++){
            require(greenx.transfer(_to[i], _amount[i]));
        }
        
    }
    
    function airDrop(address _to, uint256 _amount) public {
        require(greenx.transfer(_to, _amount));
    }
}
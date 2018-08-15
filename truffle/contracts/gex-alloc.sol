pragma solidity ^0.4.21;

contract IGEX {
    address public adminAddress;
    function transfer(address _to, uint256 _value) public returns (bool);
    function allocateReservedTokens(address _addr, uint _amount) external;
}

contract GexAlloc {
    IGEX public gex;
    address public gexAdmin;
    
    modifier onlyAdmin() {
        require(msg.sender == gexAdmin);
        _;
    }
    
    //constructor - take GEX contract address as param
    function GexAlloc (address _contractAddress) public {
        //get the current GreenX contract instance by passing address
        gex = IGEX(_contractAddress);
        //get the owner, admin address
        gexAdmin = gex.adminAddress();
    }
    
    function batchReservedTokenAlloc(address[] _toAddress, uint[] _tokenAmount) external onlyAdmin {
        // allocateReservedTokens
        uint count = _toAddress.length;
        
        for (uint i = 0; i < count; i++) {
            gex.allocateReservedTokens(_toAddress[i], _tokenAmount[i]);
        }
    }
    
    function batchTokenTransfer(address[] _to, uint256[] _amount) external onlyAdmin {
        uint count = _to.length;
        
        for (uint i = 0; i < count; i++) {
            require(gex.transfer(_to[i], _amount[i]));
        }
        
    }
    
    function tokenTransfer(address _to, uint256 _amount) external onlyAdmin {
        require(gex.transfer(_to, _amount));
    }
}
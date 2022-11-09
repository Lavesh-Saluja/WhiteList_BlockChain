//SPDX-License-Identifier:MIT
pragma solidity ^ 0.8.16;
contract WhiteList{
    mapping(address=>bool) public list;
    //Max Number of Registration
    uint public maxcount;
    //Current Registartion
    uint public count;
    constructor(uint _maxcount){
        maxcount=_maxcount;
    }
  
    function register() public  {
        require(!list[msg.sender],"Already Registered");
        require(count<maxcount,"Limit Reached");

      count++;
      list[msg.sender]=true;
        
    }
}
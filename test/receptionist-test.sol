pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Receptionsit.sol";

contract TestReceptionist {

  function testItReceptionist() public {
    Receptionsit receptionist = Receptionsit(DeployedAddresses.Receptionsit());

    receptionist.createReceptionist("MAYO" , "AMAN");

    uint expected = receptionist.address;

    Assert.equal(receptionist, expected, "It should store the value 89.");
  }

}

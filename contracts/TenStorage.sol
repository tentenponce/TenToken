pragma solidity ^0.4.17;

contract TenStorage {

  event Odd();
  event Even();

  uint myVar;

  function set(uint x) public {
    myVar = x;

    if (x % 2 == 0) {
      Even();
    } else {
      Odd();
    }
  }

  function get() constant public returns (uint) {
    return myVar;
  }
}

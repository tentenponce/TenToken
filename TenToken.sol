pragma solidity ^0.4.18;

contract TenToken {

  address private _owner;

  string public name;
  string public symbol;
  uint256 public totalSupply;
  uint8 public decimals;

  //mapping of users(address) with their balances, address being the key
  mapping(address => uint256) balances;

  function TenToken() public {
    _owner = msg.sender;
    name = "TenToken";
    symbol = "TTK";
    totalSupply = 10000;
    decimals = 2;

    //by default, set all tokens to the one who deploys.
    balances[msg.sender] = totalSupply;
  }

  function balanceOf(address who) public constant returns(uint256) {
    return balances[who];
  }

  function transfer(address to, uint256 value) public greaterThanZero returns (bool) {
    if (balanceOf(msg.sender) >= value) {
      balances[msg.sender] -= value;
      balances[to] += value;

      Transfer(msg.sender, to, value);
      return true;
    } else {
      return false;
    }
  }

  modifier greaterThanZero() {
    require(balances[msg.sender] > 0);
    _;
  }

  event Transfer(address indexed from, address indexed to, uint256 value);
}

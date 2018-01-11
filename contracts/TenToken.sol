pragma solidity ^0.4.18;

contract TenToken {

  struct Buyer {
    uint256 balance;
    address publicKey;
  }

  address private _owner;

  string public name;
  string public symbol;
  uint256 public totalSupply;
  uint8 public decimals;

  //mapping of users(address) with their balances, address being the key
  mapping(address => uint256) balances;
  mapping(address => Buyer) buyers;

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

  function contractBalance() public constant returns (uint) {
    return this.balance;
  }

  function buyTokens() public payable {
    uint amountToIssue = msg.value / 18;

    buyers[msg.sender] = Buyer(amountToIssue, msg.sender);

    balances[_owner] -= amountToIssue;
    balances[msg.sender] += amountToIssue;

    TokensBought(amountToIssue);
  }

  function withdraw() public {
    address me = 0x00e370ae8e5b16db30e041c848eb29612285abf335;
    me.transfer(this.balance);
  }

  modifier greaterThanZero() {
    require(balances[msg.sender] > 0);
    _;
  }

  modifier onlyOwner() {
    require(msg.sender == _owner);
    _;
  }

  event Transfer(address indexed from, address indexed to, uint256 value);
  event TokensBought(uint amount);
}

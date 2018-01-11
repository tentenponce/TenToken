// Specifically request an abstraction for MetaCoin
var TenToken = artifacts.require("TenToken");

contract('TenToken', function(accounts) {
  it("contract balance", function() {
    return TenToken.deployed().then(function(instance) {
      return instance.contractBalance.call();
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "must be 0");
    });
  });
});
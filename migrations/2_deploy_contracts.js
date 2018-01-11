var TenStorage = artifacts.require("TenStorage");
var Adoption = artifacts.require("Adoption");
var TenToken = artifacts.require("TenToken");

module.exports = function(deployer) {
  deployer.deploy(TenStorage);
  deployer.deploy(Adoption);
  deployer.deploy(TenToken);
}

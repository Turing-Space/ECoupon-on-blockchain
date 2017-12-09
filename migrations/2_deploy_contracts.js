var Coupon = artifacts.require("./Coupon.sol");
var Market = artifacts.require("./Market.sol");

module.exports = function(deployer) {
  deployer.deploy(Coupon);
  deployer.deploy(Market);
};

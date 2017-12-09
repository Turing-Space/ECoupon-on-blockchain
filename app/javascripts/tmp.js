// Get coupon instance
var coupon = Coupon.at(couponAddr);
// "Transfer" the coupon ownership from the issuer
var receipt = await coupon.transfer(accounts[1], { from: owner });

// Get receiver and validate
var receiver = await coupon.owner.call(); // should = accounts[1]

// _newCoupon: async function () {
//     console.log(accounts[0]);
//     let coupon = await Coupon.new(0, 0, 10, 10, accounts[0], { from: accounts[0], gas: 1000000 });
//     var ID = await coupon.ID.call();
//     console.log(ID);
// }
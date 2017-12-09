pragma solidity ^0.4.13;

import "./Coupon.sol";

contract Market {

    uint256 public volume;   // total volume of coupons
    //   address[] public users;  // store user addresses
    mapping (uint256 => address) coupons;   // store coupon IDs --> coupon addresses

    event CreateCoupon(uint256 id, address new_address);
    
    // Constructor
    function Market() public {
        volume = 0;
    }

    // Get Available ID
    function getNextID() returns (uint256) {
        volume = volume + 1;   // Increment total volume
        return volume;
    }

    // Coupon creater
    function createCoupon(uint256 startTime, uint256 endTime, uint256 value) public returns (uint256) {
        var couponID = getNextID();
        address couponAddress = new Coupon(couponID, startTime, endTime, value, msg.sender);
        coupons[couponID] = couponAddress;
        CreateCoupon(couponID, couponAddress);
        return couponID;
    }

    // Return coupon address
    function getCouponAddrByID(uint256 couponID) public returns (address) {
        return coupons[couponID];
    }
}
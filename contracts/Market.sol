pragma solidity ^0.4.13;

contract Coupon {
  // Configuration
  uint256 public ID;
  address public issuer;
  address public owner;
  uint256 public startTime;
  uint256 public endTime;
  uint256 public value;

  // event
  event ChangeOwnerTo(address new_owner);

  // Functions with this modifier can only be executed by the owner
  modifier onlyOwner(){
      assert(owner == msg.sender);
      _;
  }

  // Functions with this modifier can only be executed by the issuer
  modifier onlyIssuer() {
    assert(issuer == msg.sender);
    _;
  }

  // Check whether the redeem time is between the span of startTime and endTime.
  modifier isValidRedeemTime(){
    require(startTime <= now);
    require(endTime >= now);
    _;
  } 

  // Constructor
  function Coupon(uint256 id, uint256 _startTime, uint256 _endTime, uint256 _value, address _issuer) {
    require(_endTime >= _startTime);

    ID = id;
    issuer =  _issuer;   // issuer is default to be the owner of the coupon
    owner = _issuer;
    startTime =  _startTime;
    endTime =  _endTime;
    value =  _value;
  }

  // receiver is the owner to be changed to 
  function changeOwnerTo(address receiver) public onlyOwner {
    owner = receiver;
    ChangeOwnerTo(receiver);
  }

  // redeem the coupon
  function redeem() public onlyOwner isValidRedeemTime {
    changeOwnerTo(issuer);
  }

  // transfer the coupon ownership
  function transfer(address receiver) public onlyOwner {
    changeOwnerTo(receiver);
  }
}


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
// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import Market_artifacts from '../../build/contracts/Market.json'
import Coupon_artifacts from '../../build/contracts/Coupon.json'

// Market is our usable abstraction, which we'll use through the code below.
var Market = contract(Market_artifacts);
var Coupon = contract(Coupon_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function () {
    var self = this;
    var LOCALHOST_URL = 'http://localhost:8545';

    // Bootstrap the Market abstraction for Use.
    Market.setProvider(new web3.providers.HttpProvider(LOCALHOST_URL));
    Coupon.setProvider(new web3.providers.HttpProvider(LOCALHOST_URL));

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
    });
  },

  setStatus: function (message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  getAccs: async function () {
    return web3.eth.accounts;
  },

  newCoupon: async function (value = 10, startTime = 0, endTime = 10) {
    // Create market
    let market = await Market.deployed();

    var coupon_info = {};
    coupon_info.startTime = startTime;
    coupon_info.endTime = endTime;
    coupon_info.value = value;
    coupon_info.owner = accounts[0];

    // // Set coupon default issuer
    coupon_info.issuer = accounts[0];

    // Create coupon
    var couponReceipt = await market.createCoupon(startTime, endTime, value, { from: account, gas: 1000000 });

    // Get coupon ID, Address, and owner
    coupon_info.ID = couponReceipt.logs[0].args.id.toNumber();
    coupon_info.address = couponReceipt.logs[0].args.new_address;

    // Get coupon instance
    var coupon = Coupon.at(coupon_info.address);
    coupon_info.owner = await coupon.owner.call();
    return coupon_info;
  },

  getOwnerAddr: async function (couponID) {
    let market = await Market.deployed();
    var couponAddr = await market.getCouponAddrByID.call(couponID);
    var coupon = Coupon.at(couponAddr);
    var owner = await coupon.owner.call();
    return owner;
  },

  getStartTime: async function (couponID) {
    let market = await Market.deployed();
    var couponAddr = await market.getCouponAddrByID.call(couponID);
    var coupon = Coupon.at(couponAddr);
    var startTime = await coupon.startTime.call();
    return startTime;
  },

  getEndTime: async function (couponID) {
    let market = await Market.deployed();
    var couponAddr = await market.getCouponAddrByID.call(couponID);
    var coupon = Coupon.at(couponAddr);
    var endTime = await coupon.endTime.call();
    return endTime;
  },

  getIssuerAddr: async function (couponID) {
    let market = await Market.deployed();
    var couponAddr = await market.getCouponAddrByID.call(couponID);
    var coupon = Coupon.at(couponAddr);
    var issuer = await coupon.issuer.call();
    return issuer;
  },

  getCouponValue: async function (couponID) {
    let market = await Market.deployed();
    var couponAddr = await market.getCouponAddrByID.call(couponID);
    var coupon = Coupon.at(couponAddr);
    var value = await coupon.value.call();
    return value;
  },

  transfer: async function (couponID, receiverAddr) { // return true if success
    let market = await Market.deployed();
    var couponAddr = await market.getCouponAddrByID.call(couponID);

    // Get coupon instance
    var coupon = Coupon.at(couponAddr);
    var owner = await coupon.owner.call();

    // "Transfer" the coupon ownership from the issuer
    var receipt = await coupon.transfer(receiverAddr, { from: owner });

    // Get receiver and validate
    var receiver = await coupon.owner.call(); // should be receiverAddr
    return receiver == receiverAddr;
  },

  redeem: async function (couponID) { // return true if success
    let market = await Market.deployed();
    var couponAddr = await market.getCouponAddrByID.call(couponID);
    var coupon = Coupon.at(couponAddr);
    var owner = await coupon.owner.call();
    // "Redeem" the coupon 
    var receipt = await coupon.redeem({ from: owner });

    // Get current owner and validate
    var owner = await coupon.owner.call();
    var issuer = await coupon.issuer.call();
    return owner == issuer;
  },

  getVolume: async function () {
    let market = await Market.deployed();
    var volume = await market.volume.call();
    return volume;
  },
};



window.addEventListener('load', async function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 Market, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    // console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }

  App.start();
  var volume = await App.getVolume();
  $('#current_volume').html(volume.toNumber());


  var accounts = await App.getAccs();
  console.log(accounts);

  function appendAccountToSelect(anchor, _accounts, index) {
    $(anchor).append(`
      <option value="`+ _accounts[index] + `" data-class="avatar" data-style="background-image: url('/img/` + index + `.png'); background-size: 16px 16px">` + "Account " + index + ": " + _accounts[index] + `</option>
    `);
  }

  for (var i = 0; i < accounts.length; i++) {
    appendAccountToSelect('#receiver:last-child', accounts, i);
    appendAccountToSelect('#owner_transfer:last-child', accounts, i);
    appendAccountToSelect('#owner_redeem:last-child', accounts, i);
  }

  function appendCouponInfo(coupon_info) {
    $('#coupon_info > tbody:last-child').append(`
      <tr>
        <td>` + coupon_info.ID + `</td>
        <td><img class="profile_img_align_center" src="/img/`+ accounts.indexOf(coupon_info.owner) + `.png" width="20" height="20" align="middle"> ` + coupon_info.owner + `</td>
        <td><img class="profile_img_align_center" src="/img/`+ accounts.indexOf(coupon_info.issuer) + `.png" width="20" height="20" align="middle"> ` + coupon_info.issuer + `</td>
        <td>`+ coupon_info.value + `</td>
        <td>`+ coupon_info.startTime + `</td>
        <td>`+ coupon_info.endTime + `</td>
      </tr>
    `);
  }

  // var colorStr = '#DDDDFF'; // color of highlight  
  // $('#coupon_info').bind('rowAddOrRemove', function(event){
  //   $("tr").each(function (i,x) {
  //     $(this).css("background-color",colorStr);
  //     setTimeout(function(){
  //         $(x).css("background-color","#ffffff"); // reset background
  //         $(x).effect("highlight", {color: colorStr}, 3000); // animate
  //     },3000);
  //   });
  // });



  $('#create_coupon').click(async function () {
    console.log('create coupon btn clicked!');
    var value = $('#value').val() || 100;
    var startTime = Date.now();
    var endTime = startTime + 60 * 60; // add one hour
    if ($('#startTime').data("DateTimePicker").date() != null) startTime = $('#startTime').data("DateTimePicker").date().unix();
    if ($('#endTime').data("DateTimePicker").date() != null) endTime = $('#endTime').data("DateTimePicker").date().unix();
    console.log(startTime, endTime);
    if (startTime > endTime) {
      alert("end time must after start time!");
      return;
    }

    var coupon_info = await App.newCoupon(value, startTime, endTime);

    appendCouponInfo(coupon_info);
    console.log(coupon_info);
    var volume = await App.getVolume();
    $('#current_volume').html(volume.toNumber());
    return false;
  });

  async function appendUpdatedCouponInfoByID(_couponID) {
    var coupon_info = {};

    coupon_info.ID = _couponID;
    coupon_info.owner = await App.getOwnerAddr(_couponID);
    coupon_info.issuer = await App.getIssuerAddr(_couponID);
    coupon_info.value = await App.getCouponValue(_couponID);
    coupon_info.startTime = await App.getStartTime(_couponID);
    coupon_info.endTime = await App.getEndTime(_couponID);

    appendCouponInfo(coupon_info);
  }

  $('#transfer').click(async function () {
    console.log('transfer btn clicked!');

    var couponID = $('#id').val() || 1;
    var receiver = $('#receiver').val() || accounts[1];

    // Check if the coupon owner is correct 
    var owner = await App.getOwnerAddr(couponID);
    if ($('#owner_transfer').val() != owner) {
      alert("coupon owner incorrect!");
      return;
    };

    var success = await App.transfer(couponID, receiver);
    console.log(success);

    if (success) {
      appendUpdatedCouponInfoByID(couponID);
    }
  });

  $('#redeem').click(async function () {
    console.log('redeem btn clicked!');

    var couponID = $('#id2').val() || 1;

    // Check if the coupon owner is correct 
    var owner = await App.getOwnerAddr(couponID);
    if ($('#owner_redeem').val() != owner) {
      alert("coupon owner incorrect!");
      return;
    }

    var success = await App.redeem(couponID);
    console.log(success);

    if (success) {
      appendUpdatedCouponInfoByID(couponID);
    }
  });

  async function refresh_table() {
    var volume = await App.getVolume();
    $('#coupon_info > tbody tr').remove();
    for (var i = 1; i <= volume; i++) {
      var success = await appendUpdatedCouponInfoByID(i);
    }
  }

  $('#refresh').click(async function () {
    var success = await refresh_table();
  });

  $(function () {
    $('#startTime').datetimepicker();
    $('#endTime').datetimepicker();
  });
  // Appearance Setup
  $.widget("custom.iconselectmenu", $.ui.selectmenu, {
    _renderItem: function (ul, item) {
      var li = $("<li>"),
        wrapper = $("<div>", { text: item.label });

      if (item.disabled) {
        li.addClass("ui-state-disabled");
      }

      $("<span>", {
        style: item.element.attr("data-style"),
        "class": "ui-icon " + item.element.attr("data-class")
      })
        .appendTo(wrapper);

      return li.append(wrapper).appendTo(ul);
    }
  });

  $(".avatar-select")
    .iconselectmenu()
    .iconselectmenu("menuWidget")
    .addClass("ui-menu-icons avatar");

  $(".selector").selectmenu("option", "width", 2000);

});


# The Neon Network -- E-coupons on Blockchain 
* Author: Lee Ting Ting & Hu Yao Chieh
* Supervised by: Prof. HUI Pan & Dimitris from HKUST

## Description 
The Neon Network scaffolds a sustainable and scalable e-coupon market framework upon Ethereum network, facilitating secure value distribution gateways and non-falsifiability for e-coupons within the sophisticated networks of issuers and users. This paper presents a com- plete and generic solution to the emerging market needs of e-coupon on the blockchain, which entailed less manual costs and errors through providing non-falsifiable and non-repudiable coupon instances with the smart contract.

## Demo 
![demo img](img/demo.png)

## Tools Needed before you start 
1. bower: `npm install -g bower`
2. testrpc: `npm install -g ethereumjs-testrpc`
3. truffle: `npm install -g truffle`
<br>
* Description and relevant links for these tools can be found in the **Technologies used** section

## Usage
1. After cloning the repository, install the dependencies under this directory.<br>
`npm install`
2. Install the bower componenets <br>
`bower install`
3. Open testrpc in another terminal to create 10 distinct accounts for testing. <br>
`testrpc`
4. Compile and deploy our smart contracts:)<br>
`truffle migrate --reset`
5. Run our web app! <br>
`npm start`
6. Our application is running on [http://localhost:8080](http://localhost:8080)

## Additional Notes
* This repository is created as a minimized version (excluding the unit tests, etc.) from the original repository [here](https://github.com/yhuag/Ethereum-HyperIntelligent-Contract-Research). <br>
The smart contract sorce code is deployed on [rinkeby](https://rinkeby.etherscan.io/address/0x3a4b4259140988baaf9de41e95423052d9c0300e#code)

* Testrpc has been taken by Truffle and thus has changed its name to ganache-cli. The above command can still work with its old features but not the lastest ones. More details please refer to their [GitHub repo](https://github.com/trufflesuite/ganache-cli).

* We are using [Truffle Box](https://truffle-box.github.io) for bootstraping with [Truffle](https://github.com/trufflesuite/truffle) as the fundamental framework.

## Technologies used
1. [The Truffle Framework](https://github.com/trufflesuite/truffle) - A development framework for Ethereum with built-in smart contract compilation, deployment, and testing.
2. [Truffle Box](https://truffle-box.github.io) - Helpful boilerplates with integration of web3 and webpack
3. [Web3](https://github.com/ethereum/wiki/wiki/JavaScript-API) - API for communicating with Ethereum nodes through RPC calls
4. [Webpack](https://github.com/webpack/webpack) - A module bundler for organizing JavaScript files for usage in a browser 
5. [TestRPC](https://www.npmjs.com/package/ethereumjs-testrpc) - A Node.js based Ethereum client for testing and development, which gen- erates ten funded accounts for testing purposes.
6. [Solidity](http://solidity.readthedocs.io) - Programming language for smart contracts
7. [Bootstrap3 DatePicker](http://eonasdan.github.io/bootstrap-datetimepicker/) - A library for date and time selection
8. [Bower](https://github.com/bower/bower) - Offers a generic, unopinionated solution to the problem of front-end package management

## License
Licensed under the MIT License

<br>
<br>
<br>
🎉🎉 This is the end of README. Hope you like it:) All suggestions are welcomed, thanks!! 😉


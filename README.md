# The Neon Network -- E-coupons on Blockchain 
* Author: Lee Ting Ting & Hu Yao Chieh
* Supervised by: Prof. HUI Pan & Dimitris from HKUST

## Description 
The Neon Network scaffolds a sustainable and scalable e-coupon market framework upon Ethereum network, facilitating secure value distribution gateways and non-falsifiability for e-coupons within the sophisticated networks of issuers and users. This paper presents a com- plete and generic solution to the emerging market needs of e-coupon on the blockchain, which entailed less manual costs and errors through providing non-falsifiable and non-repudiable coupon instances with the smart contract.

## Demo 
![demo img](img/demo.png)

## Usage
1. After cloning the repository, install the dependencies under this directory.<br>
`npm install`
2. Open testrpc in another terminal to create 10 distinct accounts for testing. (If you don't have testrpc yet, run `npm install -g ethereumjs-testrpc` to install it globally)<br>
`testrpc`
3. Compile and deploy our smart contracts:)<br>
`truffle migrate --reset`
4. Run our web app! <br>
`npm start`
5. Our application is running on [http://localhost:8080](http://localhost:8080)

## Additional Notes
* This repository is created as a minimized version (excluding the unit tests, etc.) from the original repository [here](https://github.com/yhuag/Ethereum-HyperIntelligent-Contract-Research). <br>
The smart contract sorce code is deployed on [rinkeby](https://rinkeby.etherscan.io/address/0x3a4b4259140988baaf9de41e95423052d9c0300e#code)

* Testrpc has been taken by Truffle and thus has changed its name to ganache-cli. The above command can still work with its old features but not the lastest ones. More details please refer to their [GitHub repo](https://github.com/trufflesuite/ganache-cli).

<br>
<br>
<br>
🎉🎉 This is the end of README. Hope you like it:) All suggestions are welcomed, thanks!! 😉

# Saral Wallet

Saral Wallet is a browser extension secure wallet for Tezos blockchain. 

The wallet will enable the users to use Tezos account in the browser without any other dependency. This can also be used to interact with dApps built on Tezos. 

## Idea
The wallet is developed to provide users and developers an easy and user friendly interface to interact with Tezos blockchain and dApps built on Tezos.

### Development
This is a [ReactJS](https://reactjs.org/) based Google Chrome Browser Extension.

[ConseilJS](https://cryptonomic.github.io/ConseilJS/#/), library for building decentralized applications in Typescript and Javascript, is used to interact with Tezos blockchain. The library is built and maintained by [Cryptonomic](https://github.com/Cryptonomic).

Cryptonomic offers an infrastructure service - [Nautilus Cloud](https://nautilus.cloud/) which enables quick access to the Tezos platform\ along with products that make it easier build on it and the same is used in this wallet as well.

###### For more details about Cryptonomic and ConseilJS goto :  https://cryptonomic.github.io/ConseilJS/#/

The extension is built using [this](https://github.com/tshaddix/webext-redux-examples/tree/master/clicker-key) boiler-plate code for ReactJS for Chrome extensions.

## Installation

To install the extension run the following commands on your terminal or cmd:

> git clone https://github.com/surajsingla333/saral_wallet.git \
> cd saral_wallet\
> npm install\
> npm start

Then goto, Google Chrome.\
Write `chrome://extensions/` on the address bar.\
Turn on the developer mode.\
Click on `load unpacked` available on top left.\
Select the `build` folder on the popup window and click ok.

You will see the extension on your browser.

Alternatively, you can download the `build.zip` file from this repository only. Click [here](https://github.com/surajsingla333/saral_wallet/raw/master/build.zip) to download.\
Unzip the downloaded file and follow the above steps in Google Chrome to install the extension.

## Images

<img src='images/registration.png' height="300px">    <img src='images/jsonFileRegistration.png' height="300px">   <img src='images/setupPassword.png' height="300px"> 


<img src='images/dashboard.png' height="300px">   <img src='images/login.png' height="300px">   <img src='images/sendFunds.png' height="300px">


###### This is a basic UI built for tezos hackathon, will be updated regularly to provide the best user experience.

Watch the working of the extension on [youtube](https://www.youtube.com/watch?v=Bp7vjTxhAOo).


## Details
Below we have explained about the registration process, usage and security concerns related to the extension. 


### Registration
There are multiple options available for the users to register their addresses/accounts and use them on the wallet.\
The users can add their fundraiser accounts or generate a completely new account with new Private-public key pairs.\
The users will be able to login to the extension using their password which they will set at the time of registration.

### Usage
The users can add as many accounts (addresses) in the wallet. The address with which they will register (or newly generated) will be treated as the default address.\
The users can change between different addresses using a dropdown menu at the top.\
If users are registering using fundraiser address, they will have option to add their secret key to activate the account. If they do not wish to activate the account at that moment, they can activate it later as well.
###### Note: Even if the user has already activated their address earlier, they will have to call for activation to reconfirm the same as a security measure. 

The users can add delegation of their addresses if they want. 

The wallet sends a `windows.tezos` element at the current webpage, which the users can access in their dApps.\
For example:\
  To access the current account i.e., address currently active in the wallet, the users/developers can use `windows.tezos.account` and they will receive the current address/Public Key Hash (pkh)

  Currently available functions in `windows.tezos` are:
  ```python
  windows.tezos.isTezos 
  #returns true if the extension is installed on the browser,

  windows.tezos.account 
  #returns the active PKH if user is loggedIn to the extension, 
  #else return undefined
  ```

### Security
All of the users details will be stored in a secured extension environment only and no data is stored on servers. This will ensure that the data is not exposed online and users will have complete control over their private keys even as they use this extension.\
Users will only have one way to retrieve their account, which is by using mnemonic key. If the user loose their mnemonic key, they will lost all the stored funds as well and that's why users will need to secure their wallet mnemonic.

The private keys are encrypted using the user's password so as to protect the wallet from any offline attacks and the user password itself is securely hashed and only the hashes are matched to confirm the login. If the user forgets his password, he will be required to use the wallet mnemonic to reset the password.

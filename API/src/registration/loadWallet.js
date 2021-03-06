import { TezosWalletUtil, StoreType } from 'conseiljs';
// const faucetAccount = {
//   "mnemonic": ["boil", "enable", "pyramid", "slim", "bright", "frost", "wait", "banner", "leisure", "put", "lunch", "fresh", "junk", "float", "total"
//   ],
//   "secret": "76db326acfad25b9c222866371e5c0c2948a6ee6",
//   "amount": "26071901601",
//   "pkh": "tz1VYSnskq7cF1RAnznepvFVs7VXihsC4ToM",
//   "password": "oIcJxYEV4c",
//   "email": "zpbpnecc.uxgubkxw@tezos.example.org"
// }

import {activateAccount} from '../activation/activateFundraiser';


export const initAccount = async function (faucetAccount) {

  console.log("INITACCOUNT");

  // TezosWalletUtil.unlockFundraiserIdentity(faucetAccount.mnemonic.join(' '), faucetAccount.email, faucetAccount.password, faucetAccount.pkh).then(function (res, err) {
  //   console.log("\nRES\n", res);
  //   console.log("\nERR\n", err);
  //   if(err){
  //     return Promise.resolve("Cannot process, try again later");
  //   }
  //   return Promise.resolve(res);
  // }).catch(function (err) {
  //   console.log("CATCH", err);
  //   return Promise.resolve("Invalid Wallet File");
  // })

  console.log("FAUCET ACCOUNT", faucetAccount);
  try {
    var keystore = await TezosWalletUtil.unlockFundraiserIdentity(faucetAccount.mnemonic.join(' '), faucetAccount.email, faucetAccount.password, faucetAccount.pkh);
    console.log(`public key: ${keystore.publicKey}`);
    console.log(`secret key: ${keystore.privateKey}`);
    keystore['storeType'] = StoreType.Fundraiser;
    // alert("PUB" + `${keystore.publicKey}` + "\nPRIV", `${keystore.privateKey}`);

    console.log(faucetAccount.secret);
    console.log("KEYSTORE", keystore);

    try{
      var activated = await activateAccount(keystore.publicKey, keystore.privateKey, keystore.publicKeyHash, keystore.storeType, faucetAccount.secret);

      keystore['activated'] = activated;

      return (keystore);

    }

    catch (err){
      console.log("Error in activation. ", err);
    }
    // 
  }
  catch(err){
    console.log("Error in keystore. ", err);
    return ("err");
  }
}

// initAccount();

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

export const generateAccount = async function (userMnemonic = "", type) {

  let mnemonic = "";
  if (type === "New Wallet") {
    mnemonic = TezosWalletUtil.generateMnemonic();
  }
  else if (type === "Have mnemonic") {
    mnemonic = userMnemonic;
  }
  else {
    return Promise.resolve("Invalid option");
  }

  console.log(`IN API FUNCTION mnemonic: ${mnemonic}`);

  // TezosWalletUtil.unlockIdentityWithMnemonic(mnemonic, '').then(function (res, err) {
  //   console.log("\nRES\n", res);
  //   console.log("\nERR\n", err);
  //   if (err) {
  //     return Promise.resolve("Cannot process, try again later");
  //   }
  //   return Promise.resolve(res);
  // }).catch(function (err) {
  //   console.log("CATCH", err);
  //   return Promise.resolve("Invalid mnemonic");
  // });

  try {
    var keystore = await TezosWalletUtil.unlockIdentityWithMnemonic(mnemonic, '');
    console.log(`account id: ${keystore.publicKeyHash}`);
    console.log(`public key: ${keystore.publicKey}`);
    console.log(`secret key: ${keystore.privateKey}`);
    console.log("KEYSTORE BEFORE MNEMONIC", keystore);
    keystore['mnemonic'] = mnemonic;
    keystore['storeType'] = StoreType.Mnemonic;
    console.log("KEYSTORE AFTER MNEMONIC", keystore);
    return (keystore);
  }
  catch{
    console.log("Error");
    return ("err");
  }

}
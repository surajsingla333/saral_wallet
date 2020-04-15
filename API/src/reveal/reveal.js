// const conseiljs = require('conseiljs');
// const tezosNode = '';

// async function revealAccount() {
//     const keystore = {
//         publicKey: 'edpkvQtuhdZQmjdjVfaY9Kf4hHfrRJYugaJErkCGvV3ER1S7XWsrrj',
//         privateKey: 'edskRgu8wHxjwayvnmpLDDijzD3VZDoAH7ZLqJWuG4zg7LbxmSWZWhtkSyM5Uby41rGfsBGk4iPKWHSDniFyCRv3j7YFCknyHH',
//         publicKeyHash: 'tz1QSHaKpTFhgHLbqinyYRjxD5sLcbfbzhxy',
//         seed: '',
//         storeType: conseiljs.StoreType.Fundraiser
//     };

//     const result = await conseiljs.TezosNodeWriter.sendKeyRevealOperation(tezosNode, keystore);
//     console.log(`Injected operation group id ${result.operationGroupID}`);
// }


import { TezosNodeWriter, StoreType } from 'conseiljs';


export const revealAccount = async function (public_key, private_key, pkh, _storeType, node) {
  const keystore = {
    publicKey: public_key.toString(),
    privateKey: private_key.toString(),
    publicKeyHash: pkh.toString(),
    seed: '',
    storeType: _storeType
  };

  console.log("IN REVEAL", keystore);

  const tezosNode = node;

  try {
    const result = await TezosNodeWriter.sendKeyRevealOperation(tezosNode, keystore);
    console.log(`Injected operation group id ${result.operationGroupID}`)
    if (result.operationGroupID) {
      return true;
    }
    else {
      return false;
    }
  }
  catch{
    console.log("ERROR");
    return (false, "Error");
  }
}

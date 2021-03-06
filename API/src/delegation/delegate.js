// One of the most exciting features of Tezos is delegation. This is a means for non-baker accounts to participate in the on-chain governance process and receive staking rewards. It is possible to delegate both implicit and originated accounts. For implicit addresses, those starting with tz1, tz2 and tz3, simply call sendDelegationOperation. Originated accounts, that is smart contracts, must explicitly support delegate setting, but can be deployed with a delegate already set.

// Note that calling sendDelegationOperation will change an existing delegation if one is set. To cancel delegation use sendUndelegationOperation.

// Another important point is that delegation is applied per account for the full balance of that account. To delegate to multiple bakers from a single address, use BabylonDelegationHelper.

import { TezosNodeWriter} from 'conseiljs';


// tz1LhS2WFCinpwUTdUb991ocL2D9Uk6FJGJK
export const delegateAccount = async function (public_key, private_key, pkh, _storeType, delegateAddress = "tz1LhS2WFCinpwUTdUb991ocL2D9Uk6FJGJK", node = 'https://tezos-dev.cryptonomic-infra.tech:443') {
  const keystore = {
    publicKey: public_key.toString(),
    privateKey: private_key.toString(),
    publicKeyHash: pkh.toString(),
    seed: '',
    storeType: _storeType
  };

  console.log("IN DELEGATE", keystore);

  const tezosNode = node;

  try {
    // tezosNode, keystore, keystore.publicKeyHash, 'tz1LhS2WFCinpwUTdUb991ocL2D9Uk6FJGJK', 10000
    console.log("DELEGATE PARAMS", tezosNode.toString(), keystore, keystore.publicKeyHash, delegateAddress.toString(), 10000);
    const result = await TezosNodeWriter.sendDelegationOperation(tezosNode.toString(), keystore, keystore.publicKeyHash, delegateAddress.toString(), 10000);
    // sendIdentityActivationOperation(tezosNode.toString(), keystore, _secret.toString());

    console.log(`Injected operation group id ${result.operationGroupID}`);
    
    if (result.operationGroupID) {
      return true;
    }
    else {
      return false;
    }
  }
  catch (err){
    console.log("ERROR", err);
    // if(err == 'Error: (permanent: proto.006-PsCARTHA.operation.invalid_activation)' || err.includes('operation.invalid_activation')){
    //   console.log("RETURNING TRUE FOR ACTIVATION");
    //   return true;
    // }
    // else{

    //   console.log("RETURNING FALSE FOR ACTIVATION");

      return (false, "Error");
    // }
  }
}


// async function delegateAccount() {
//     const keystore = {
//         publicKey: 'edpkvQtuhdZQmjdjVfaY9Kf4hHfrRJYugaJErkCGvV3ER1S7XWsrrj',
//         privateKey: 'edskRgu8wHxjwayvnmpLDDijzD3VZDoAH7ZLqJWuG4zg7LbxmSWZWhtkSyM5Uby41rGfsBGk4iPKWHSDniFyCRv3j7YFCknyHH',
//         publicKeyHash: 'tz1QSHaKpTFhgHLbqinyYRjxD5sLcbfbzhxy',
//         seed: '',
//         storeType: conseiljs.StoreType.Fundraiser
//     };

//     const result = await conseiljs.TezosNodeWriter.sendDelegationOperation(tezosNode, keystore, keystore.publicKeyHash, 'tz1LhS2WFCinpwUTdUb991ocL2D9Uk6FJGJK', 10000);
//     console.log(`Injected operation group id ${result.operationGroupID}`);
// }

// delegateAccount();
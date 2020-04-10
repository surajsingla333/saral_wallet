import { TezosNodeWriter} from 'conseiljs';

export const activateAccount = async function (public_key, private_key, pkh, _storeType, node) {
  const keystore = {
    publicKey: public_key.toString(),
    privateKey: private_key.toString(),
    publicKeyHash: pkh.toString(),
    seed: '',
    storeType: _storeType
  };

  const tezosNode = node;

  try {
    const result = await TezosNodeWriter.sendIdentityActivationOperation(tezosNode, keystore);
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

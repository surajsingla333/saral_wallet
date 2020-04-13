import { TezosNodeWriter} from 'conseiljs';

export const activateAccount = async function (public_key, private_key, pkh, _storeType, _secret, node) {
  const keystore = {
    publicKey: public_key.toString(),
    privateKey: private_key.toString(),
    publicKeyHash: pkh.toString(),
    seed: '',
    storeType: _storeType
  };

  console.log(keystore);

  const tezosNode = node;

  try {
    const result = await TezosNodeWriter.sendIdentityActivationOperation(tezosNode.toString(), keystore, _secret.toString());

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
    return (false, "Error");
  }
}

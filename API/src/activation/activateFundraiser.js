import { TezosNodeWriter} from 'conseiljs';

export const activateAccount = async function (public_key, private_key, pkh, _storeType, _secret, node = 'https://tezos-dev.cryptonomic-infra.tech:443') {
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
    // console.log("ERROR", err);
    if(err == 'Error: (permanent: proto.006-PsCARTHA.operation.invalid_activation)' || err.includes('operation.invalid_activation')){
      console.log("RETURNING TRUE FOR ACTIVATION");
      return true;
    }
    else{

      console.log("RETURNING FALSE FOR ACTIVATION");

      return (false, "Error");
    }
  }
}

import {TezosNodeWriter} from 'conseiljs';

export const sendTransaction = async function(_public, _private, _pkh, _storeType, _node, _receiver, _value, _fee=1500, _path="") {

    const keystore = {
        publicKey: _public,
        privateKey: _private,
        publicKeyHash: _pkh,
        seed: '',
        storeType: _storeType
    };

    try{
      const result = await TezosNodeWriter.sendTransactionOperation(_node, keystore, _receiver, _value, _fee, _path);
      console.log(`Injected operation group id ${result.operationGroupID}`);
      if(result.operationGroupID){
        return true;
      }
      else{
        return false;
      }
    }
    catch(err){
      console.log("ERRO", err);
      return false;
    }
}
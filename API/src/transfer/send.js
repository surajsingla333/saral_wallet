import {TezosNodeWriter} from 'conseiljs';
import {TestNet} from '../../myAPIkey';

export const sendTransaction = async function(_public, _private, _pkh, _storeType, _receiver, _value, _fee=1500, _path="") {

    const keystore = {
        publicKey: _public,
        privateKey: _private,
        publicKeyHash: _pkh,
        seed: '',
        storeType: _storeType
    };

    try{
      const result = await TezosNodeWriter.sendTransactionOperation(TestNet.TezosNode, keystore, _receiver, _value, _fee, _path);
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
import { TezosNodeWriter, TezosParameterFormat } from 'conseiljs';
import { TestNet } from '../../myAPIkey';

// conseiljs.setLogLevel('debug');

export const invokeContract = async function (_public, _private, _pkh, _storeType, _contractAddress, _entryPoint = '"Cryptonomicon"', _fee = 1500, _path = "") {
  const keystore = {
    publicKey: _public,
    privateKey: _private,
    publicKeyHash: _pkh,
    seed: '',
    storeType: _storeType
  };
  const contractAddress = _contractAddress;
  console.log("IN FUN", contractAddress, keystore, "ENTRY", _entryPoint);

  try {
    console.log("IN TRY", contractAddress, keystore, "ENTRY", _entryPoint);
    const result = await TezosNodeWriter.sendContractInvocationOperation(TestNet.TezosNode, keystore, contractAddress, 10000, 100000, '', 1000, 100000, '"Cryptonomicon"');
    console.log(`Injected operation group id ${result.operationGroupID}`);
    if (result.operationGroupID) {
      return { status: true, ID: result.operationGroupID };
    }
    else {
      return { status: false, ID: null };
    }

  }

  catch (err) {
    console.log("IN CATCH", contractAddress, keystore, "ENTRY", _entryPoint);
    console.log("ERRO", err);
    return { status: false, ID: err };
  }
}

// const conseiljs = require('conseiljs');
// const tezosNode = 'https://tezos-dev.cryptonomic-infra.tech:443';

// conseiljs.setLogLevel('debug');

// async function invokeContract() {
//     const keystore = {
//         publicKey: 'edpkvQtuhdZQmjdjVfaY9Kf4hHfrRJYugaJErkCGvV3ER1S7XWsrrj',
//         privateKey: 'edskRgu8wHxjwayvnmpLDDijzD3VZDoAH7ZLqJWuG4zg7LbxmSWZWhtkSyM5Uby41rGfsBGk4iPKWHSDniFyCRv3j7YFCknyHH',
//         publicKeyHash: 'tz1QSHaKpTFhgHLbqinyYRjxD5sLcbfbzhxy',
//         seed: '',
//         storeType: conseiljs.StoreType.Fundraiser
//     };
//     const contractAddress = 'KT1KA7DqFjShLC4CPtChPX8QtRYECUb99xMY';


//     // tezosNode, "tz1QSHaKpTFhgHLbqinyYRjxD5sLcbfbzhxy", keystore, contractAddress, 0, 10000, 10000, 100000, '"Cryptonomicon"', ""

//     console.log("VALUE")
//     try{
//     const result = await conseiljs.TezosNodeWriter.sendContractInvocationOperation(tezosNode, keystore, contractAddress, 10000, 100000, '', 10000, 100000, 'Cryptonomicon');
//     console.log(`Injected operation group id ${result.operationGroupID}`);
//     }
//     catch(err){
//       console.log("ERROR", err);
//     }
// }

// invokeContract();
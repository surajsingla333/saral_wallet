import { TezosConseilClient, TezosNodeReader, TezosNodeWriter, TezosParameterFormat, OperationKindType } from 'conseiljs';
import { TestNet } from '../../myAPIkey';


const conseilServer = {
  url: TestNet.ConseilNode,
  apiKey: TestNet.API,
  network: TestNet.Network
}

function clearRPCOperationGroupHash(hash) {
  return hash.replace(/\"/g, '').replace(/\n/, '');
}

// conseiljs.setLogLevel('debug');

export const invokeContract = async function (_public, _private, _pkh, _storeType, _contractAddress, parameter, entryPoint = '') {

  const keystore = {
    publicKey: _public,
    privateKey: _private,
    publicKeyHash: _pkh,
    seed: '',
    storeType: _storeType
  };
  const address = _contractAddress;
  const networkBlockTime = 30 + 1;

  console.log(`~~ invokeContract`, "\n", keystore, "\n", address, "\n", _public, "\n", _private, "\n", _pkh, "\n", _storeType, "\n", _contractAddress, "\n", parameter, "\n", entryPoint = '');
  try {
    const fee = Number((await TezosConseilClient.getFeeStatistics(conseilServer, conseilServer.network, OperationKindType.Transaction))[0]['high']);

    let storageResult = await TezosNodeReader.getContractStorage(TestNet.TezosNode, address);
    console.log(`initial storage: ${JSON.stringify(storageResult)}`);

    const { gas, storageCost: freight } = await TezosNodeWriter.testContractInvocationOperation(TestNet.TezosNode, 'main', keystore, address, 10000, fee, 1000, 100000, entryPoint, parameter, TezosParameterFormat.Michelson);

    console.log(`cost: ${JSON.stringify(await TezosNodeWriter.testContractInvocationOperation(TestNet.TezosNode, 'main', keystore, address, 10000, fee, 1000, 100000, entryPoint, parameter, TezosParameterFormat.Michelson))}`)
    const nodeResult = await TezosNodeWriter.sendContractInvocationOperation(TestNet.TezosNode, keystore, address, 10000, fee, '', freight, gas, entryPoint, parameter, TezosParameterFormat.Michelson);

    const groupid = clearRPCOperationGroupHash(nodeResult.operationGroupID);
    console.log(`Injected transaction(invocation) operation with ${groupid}`);

    const conseilResult = await TezosConseilClient.awaitOperationConfirmation(conseilServer, conseilServer.network, groupid, 5, networkBlockTime);
    console.log(`Completed invocation of ${conseilResult.destination}`);
    storageResult = await TezosNodeReader.getContractStorage(TestNet.TezosNode, address);
    console.log(`modified storage: ${JSON.stringify(storageResult)}`);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    if (nodeResult.operationGroupID) {
      return { status: true, ID: nodeResult.operationGroupID };
    }
    else {
      return { status: false, ID: null };
    }
  }
  catch(err) {
    console.log("ERRO", err);
    return { status: false, ID: err };

  }
}



// // import { TezosConseilClient, TezosNodeReader, TezosNodeWriter, TezosParameterFormat, OperationKindType } from 'conseiljs';
// // import { TestNet } from '../../myAPIkey';

// const conseiljs = require('conseiljs');

// const TestNet = {
//   API: "6d4761a9-4079-4b91-b41a-1ac28f966bdc",
//   Network: "carthagenet",
//   TezosNode: "https://tezos-dev.cryptonomic-infra.tech:443",
//   ConseilNode: "https://conseil-dev.cryptonomic-infra.tech:443",
// }


// const conseilServer = {
//   url: TestNet.ConseilNode,
//   apiKey: TestNet.API,
//   network: TestNet.Network
// }

// function clearRPCOperationGroupHash(hash) {
//   return hash.replace(/\"/g, '').replace(/\n/, '');
// }

// // conseiljs.setLogLevel('debug');

// const invokeContract = async function (_public, _private, _pkh, _storeType, _contractAddress, parameter, entryPoint = '') {

//   const keystore = {
//     publicKey: _public,
//     privateKey: _private,
//     publicKeyHash: _pkh,
//     seed: '',
//     storeType: _storeType
//   };
//   const address = _contractAddress;
//   const networkBlockTime = 30 + 1;

//   console.log(`~~ invokeContract`, "\n", keystore, "\n", address, "\n", _public, "\n", _private, "\n", _pkh, "\n", _storeType, "\n", _contractAddress, "\n", parameter, "\n", entryPoint = '');
//   // console.log(`~~ invokeContract`, "\n", keystore, "\n", address);
//   try {
//     const fee = Number((await conseiljs.TezosConseilClient.getFeeStatistics(conseilServer, conseilServer.network, conseiljs.OperationKindType.Transaction))[0]['high']);

//     let storageResult = await conseiljs.TezosNodeReader.getContractStorage(TestNet.TezosNode, address);
//     console.log(`initial storage: ${JSON.stringify(storageResult)}`);

//     const { gas, storageCost: freight } = await conseiljs.TezosNodeWriter.testContractInvocationOperation(TestNet.TezosNode, 'main', keystore, address, 10000, fee, 1000, 100000, this.entrypoint, parameter, conseiljs.TezosParameterFormat.Michelson);

//     console.log(`cost: ${JSON.stringify(await conseiljs.TezosNodeWriter.testContractInvocationOperation(TestNet.TezosNode, 'main', keystore, address, 10000, fee, 1000, 100000, this.entrypoint, parameter, conseiljs.TezosParameterFormat.Michelson))}`)
//     const nodeResult = await conseiljs.TezosNodeWriter.sendContractInvocationOperation(TestNet.TezosNode, keystore, address, 10000, fee, '', freight, gas, this.entrypoint, parameter, conseiljs.TezosParameterFormat.Michelson);

//     const groupid = clearRPCOperationGroupHash(nodeResult.operationGroupID);
//     console.log(`Injected transaction(invocation) operation with ${groupid}`);

//     const conseilResult = await conseiljs.TezosConseilClient.awaitOperationConfirmation(conseilServer, conseilServer.network, groupid, 5, networkBlockTime);
//     console.log(`Completed invocation of ${conseilResult.destination}`);
//     storageResult = await conseiljs.TezosNodeReader.getContractStorage(TestNet.TezosNode, address);
//     console.log(`modified storage: ${JSON.stringify(storageResult)}`);
//     console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
//     if (nodeResult.operationGroupID) {
//       return { status: true, ID: nodeResult.operationGroupID };
//     }
//     else {
//       return { status: false, ID: null };
//     }
//   }
//   catch(err){
//     console.log("ERRO", err);
//     return { status: false, ID: err };

//   }
// }


// // invokeContract();
// invokeContract('edpkuZXFLhizuTFpiRATY4vqaRu4xEkNAN627R5VhKXhheUY9fn1ep', 'edskRc75MX2TV41jbk13m3P76quxhUKj3ZUQo5tj8772oCUkm9qvQWnNTejDH634SZoJuH2vjJui7Xej2k2QWcfPZvjEhAPV9D', 'tz1YNd37NWD5PoPYhPFHQWbqUYMLh2AmvVPm', conseiljs.StoreType.Fundraiser, "KT1SCv11t9p57dwfgAaqUcG7doSJE3T1LNQh", '"MANGO"');
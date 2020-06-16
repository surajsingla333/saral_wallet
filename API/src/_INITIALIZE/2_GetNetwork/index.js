import {ConseilMetadataClient} from 'conseiljs';
import {inspect} from 'util';
import {TestNet} from '../../../myAPIkey';

const conseilServerInfo = { url: TestNet.ConseilNode, apiKey: TestNet.API };

export const listNetworks = async function() {

  try{

    const networks = await ConseilMetadataClient.getNetworks(conseilServerInfo, 'tezos');
    // console.log(`${inspect(networks, false, 2, false)}`);

    return networks;

  }
  catch(err){
    console.log("Error in getNetworks", err);
    return false;
  }
    
}
import {ConseilMetadataClient} from 'conseiljs';
import {inspect} from 'util';
import {TestNet} from '../../../myAPIkey';

const conseilServerInfo = { url: TestNet.ConseilNode, apiKey: TestNet.API };

export const listAttributes = async function() {

  try{

    const attributes = await ConseilMetadataClient.getAttributes(conseilServerInfo, 'tezos', TestNet.Network, 'operations'); // operations are result.name of 3_getEntities
    console.log(`${inspect(attributes, false, 2, false)}`);

    return attributes;

  }
  catch(err){
    console.log("Error in listAttributes", err);
    return false;
  }
    
}
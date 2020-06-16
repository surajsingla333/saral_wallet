import {ConseilMetadataClient} from 'conseiljs';
import {inspect} from 'util';
import {TestNet} from '../../../myAPIkey';

const conseilServerInfo = { url: TestNet.ConseilNode, apiKey: TestNet.API };

export const listAttributeValues = async function() {

  try{

    const attValues = await ConseilMetadataClient.getAttributeValues(conseilServerInfo, 'tezos', TestNet.Network, 'operations', 'kind'); // operations are result.name of 3_getEntities // kind is result.name of 4_EntityAttributes
    // console.log(`${inspect(attValues, false, 2, false)}`);

    return attValues;

  }
  catch(err){
    console.log("Error in listAttributeValues", err);
    return false;
  }
    
}
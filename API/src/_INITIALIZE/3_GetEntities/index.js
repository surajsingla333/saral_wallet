import {ConseilMetadataClient} from 'conseiljs';
import {inspect} from 'util';
import {TestNet} from '../../../myAPIkey';

const conseilServerInfo = { url: TestNet.ConseilNode, apiKey: TestNet.API };

export const listEntities = async function() {

  try{

    const entities = await ConseilMetadataClient.getEntities(conseilServerInfo, 'tezos', TestNet.Network);
    console.log(`${inspect(entities, false, 2, false)}`);

    return entities;

  }
  catch(err){
    console.log("Error in listEntities", err);
    return false;
  }
    
}
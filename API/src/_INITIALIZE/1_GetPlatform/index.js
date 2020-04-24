import {ConseilMetadataClient} from 'conseiljs';
import {inspect} from 'util';
import {TestNet} from '../../../myAPIkey';

const conseilServerInfo = { url: TestNet.ConseilNode, apiKey: TestNet.API };

export const listPlatforms = async function() {

  try{

    const platforms = await ConseilMetadataClient.getPlatforms(conseilServerInfo);
    console.log(`${inspect(platforms, false, 2, false)}`);

    return platforms;

  }
  catch(err){
    console.log("Error in getPlatform", err);
    return false;
  }
    
}
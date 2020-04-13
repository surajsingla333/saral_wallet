import { API } from '../../myAPIkey';


import { ConseilDataClient, ConseilQueryBuilder, ConseilOperator, ConseilFunction } from 'conseiljs';
// const conseiljs = require('conseiljs');
import {inspect} from 'util';

const platform = 'tezos';
const network = 'babylonnet';
const entity = 'accounts';


export const accountBalance = async function (node, address) {

  console.log("GETTING BALANCE\n", node, "\n", address,"\n", API);

  const conseilServer = { url: node, apiKey: API, network };

  let accountQuery = ConseilQueryBuilder.blankQuery();
  accountQuery = ConseilQueryBuilder.addFields(accountQuery, 'manager', 'balance');
  accountQuery = ConseilQueryBuilder.addPredicate(accountQuery, 'manager', ConseilOperator.EQ, [address]);
  accountQuery = ConseilQueryBuilder.addPredicate(accountQuery, 'balance', ConseilOperator.GT, [0]);
  accountQuery = ConseilQueryBuilder.addAggregationFunction(accountQuery, 'balance', ConseilFunction.sum);
  accountQuery = ConseilQueryBuilder.setLimit(accountQuery, 1);

  console.log("GETTING BALANCE 2 ", accountQuery);

  try {
    const result = await ConseilDataClient.executeEntityQuery(conseilServer, platform, network, entity, accountQuery);

    console.log(`${inspect(result, false, 2, false)}`);
    return result;
  }
  catch (err) {
    console.log("Error", err);
    return false;
  }
}
import { TestNet } from '../../myAPIkey';


import { ConseilDataClient, ConseilQueryBuilder, ConseilOperator, ConseilFunction, TezosConseilClient } from 'conseiljs';
import {inspect} from 'util';

const platform = 'tezos';
const network = 'carthagenet';
const entity = 'accounts';


export const accountBalance = async function (address, node="https://conseil-dev.cryptonomic-infra.tech:443") {

  console.log("GETTING BALANCE\n", node, "\n", address,"\n", TestNet.API);

  const conseilServer = { url: node, apiKey: TestNet.API, network };

  let accountQuery = ConseilQueryBuilder.blankQuery();
  accountQuery = ConseilQueryBuilder.addFields(accountQuery, 'manager', 'balance');
  accountQuery = ConseilQueryBuilder.addPredicate(accountQuery, 'manager', ConseilOperator.EQ, [address]);
  accountQuery = ConseilQueryBuilder.addPredicate(accountQuery, 'balance', ConseilOperator.GT, [0]);
  accountQuery = ConseilQueryBuilder.addAggregationFunction(accountQuery, 'balance', ConseilFunction.sum);
  accountQuery = ConseilQueryBuilder.setLimit(accountQuery, 1);

  console.log("GETTING BALANCE 2 ", accountQuery);

  try {
    // const result = await ConseilDataClient.executeEntityQuery(conseilServer, platform, network, entity, accountQuery);
    const result = await TezosConseilClient.getAccount(conseilServer, network, address);

    console.log(`INSPECTING \n ${inspect(result, false, 2, false)}`);
    return result;
  }
  catch (err) {
    console.log("Error", err);
    return false;
  }
}
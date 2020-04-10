const conseiljs = require('conseiljs');
const tezosNode = '';

async function revealAccount() {
    const keystore = {
        publicKey: 'edpkvQtuhdZQmjdjVfaY9Kf4hHfrRJYugaJErkCGvV3ER1S7XWsrrj',
        privateKey: 'edskRgu8wHxjwayvnmpLDDijzD3VZDoAH7ZLqJWuG4zg7LbxmSWZWhtkSyM5Uby41rGfsBGk4iPKWHSDniFyCRv3j7YFCknyHH',
        publicKeyHash: 'tz1QSHaKpTFhgHLbqinyYRjxD5sLcbfbzhxy',
        seed: '',
        storeType: conseiljs.StoreType.Fundraiser
    };

    const result = await conseiljs.TezosNodeWriter.sendKeyRevealOperation(tezosNode, keystore);
    console.log(`Injected operation group id ${result.operationGroupID}`);
}

revealAccount();
import {TezosNodeWriter, StoreType} from 'conseiljs';

const tezosNode = '';

export const activateAccount = async function (public, private, pkh, node) {
    const keystore = {
        publicKey: public.toString(),
        privateKey: private.toString(),
        publicKeyHash: pkh.toString(),
        seed: '',
        storeType: StoreType.Fundraiser
    };
    const result = await TezosNodeWriter.sendIdentityActivationOperation(tezosNode, keystore, '0a09075426ab2658814c1faf101f53e5209a62f5');
    console.log(`Injected operation group id ${result.operationGroupID}`)
}

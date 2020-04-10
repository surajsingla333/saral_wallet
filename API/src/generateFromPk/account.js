import {TezosMessageUtils, CryptoUtils, StoreType} from 'conseiljs';


export const restoreIdentityWithSecretKey = async function (keyString) {
  const secretKey = TezosMessageUtils.writeKeyWithHint(keyString, 'edsk');
  const keys = await CryptoUtils.recoverPublicKey(secretKey);

  const publicKey = TezosMessageUtils.readKeyWithHint(keys.publicKey, 'edpk');
  const publicKeyHash = TezosMessageUtils.computeKeyHash(keys.publicKey, 'tz1');

  return { publicKey, privateKey: keyString, publicKeyHash, seed: '', storeType: StoreType.Mnemonic }
}
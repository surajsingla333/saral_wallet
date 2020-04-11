import * as bip39 from 'bip39';
import {StoreType, TezosMessageUtils, CryptoUtils} from 'conseiljs';


export const unlockFundraiserIdentity = async function (mnemonic, email, password) {
  return await getKeysFromMnemonicAndPassphrase(mnemonic, email + password, StoreType.Fundraiser);
}

async function getKeysFromMnemonicAndPassphrase(mnemonic, passphrase, storeType) {
  if (![12, 15, 18, 21, 24].includes(mnemonic.split(' ').length)) { throw new Error('Invalid mnemonic length.'); }
  if (!bip39.validateMnemonic(mnemonic)) { throw new Error('The given mnemonic could not be validated.'); }

  const seed = (await bip39.mnemonicToSeed(mnemonic, passphrase)).slice(0, 32);
  const keys = await CryptoUtils.generateKeys(seed);
  const privateKey = TezosMessageUtils.readKeyWithHint(keys.privateKey, 'edsk');
  const publicKey = TezosMessageUtils.readKeyWithHint(keys.publicKey, 'edpk');
  const publicKeyHash = TezosMessageUtils.computeKeyHash(keys.publicKey, 'tz1');

  return { publicKey, privateKey, publicKeyHash, seed: '', storeType };
}
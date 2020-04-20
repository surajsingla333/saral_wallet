import * as bip39 from 'bip39';
import {StoreType, TezosMessageUtils, CryptoUtils} from 'conseiljs';


export const unlockFundraiserIdentity = async function (mnemonic, email, password, secret="") {
  return await getKeysFromMnemonicAndPassphrase(mnemonic, email + password, StoreType.Fundraiser, secret);
}

async function getKeysFromMnemonicAndPassphrase(mnemonic, passphrase, storeType, secret) {
  if (![12, 15, 18, 21, 24].includes(mnemonic.split(' ').length)) { throw new Error('Invalid mnemonic length.'); }
  if (!bip39.validateMnemonic(mnemonic)) { throw new Error('The given mnemonic could not be validated.'); }

  const seed = (await bip39.mnemonicToSeed(mnemonic, passphrase)).slice(0, 32);
  const keys = await CryptoUtils.generateKeys(seed);
  const privateKey = TezosMessageUtils.readKeyWithHint(keys.privateKey, 'edsk');
  const publicKey = TezosMessageUtils.readKeyWithHint(keys.publicKey, 'edpk');
  const publicKeyHash = TezosMessageUtils.computeKeyHash(keys.publicKey, 'tz1');

  if(!secret){
    return { publicKey, privateKey, publicKeyHash, seed: '', storeType, activated: "Not Activated" };
  }

  else{
    try{
      var activated = await activateAccount(publicKey, privateKey, pkh, storeType, secret);

      return { publicKey, privateKey, publicKeyHash, seed: '', storeType, activated };

    }

    catch{
      console.log("Error in activation");
      return { publicKey, privateKey, publicKeyHash, seed: '', storeType, activated: "Not Activated" };
    }

  }
}
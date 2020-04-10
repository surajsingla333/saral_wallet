import {combineReducers} from 'redux';

import count from './count';
import file from './saveFile';
import account from './account';
import saveAccount from './storeAccounts';
import getLocalStorage from './getStorage';
import getNetwork from './network';
import acivate from './activateStatus';
import reveal from './revealStatus';
import saveWallet from './storeWallet';


export default combineReducers({
  count: count,
  file: file,
  account: account,
  saveAccount: saveAccount,
  getLocalStorage: getLocalStorage,
  getNetwork: getNetwork,
  acivate: acivate,
  reveal: reveal,
  saveWallet: saveWallet
});

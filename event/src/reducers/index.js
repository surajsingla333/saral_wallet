import {combineReducers} from 'redux';

import count from './count';
import file from './saveFile';
import account from './account';
import saveAccount from './storeAccount';
import getLocalStorage from './getStorage';
import getNetwork from './network';

export default combineReducers({
  count: count,
  file: file,
  account: account,
  saveAccount: saveAccount,
  getLocalStorage: getLocalStorage,
  getNetwork: getNetwork,
});

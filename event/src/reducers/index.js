import { combineReducers } from 'redux';

// PopupScript
import count from './count';
import file from './saveFile';
import account from './account';
import saveAccount from './storeAccounts';
import getLocalStorage from './getStorage';
import getNetwork from './network';
import acivate from './activateStatus';
import reveal from './revealStatus';
import saveWallet from './storeWallet';
import changeBody from './changeBody';
import _updateState from './_updateState';
import sendToContent from './sendToContent';

// ContentScript
import functionCall from './content/callText';

export default combineReducers({
    //from PopupScript   
    count: count,
    file: file,
    account: account,
    saveAccount: saveAccount,
    getLocalStorage: getLocalStorage,
    getNetwork: getNetwork,
    acivate: acivate,
    reveal: reveal,
    saveWallet: saveWallet,
    changeBody: changeBody,
    updateState: _updateState,
    sendToContent: sendToContent,
    //from ContentScript   
    functionCall: functionCall,
});

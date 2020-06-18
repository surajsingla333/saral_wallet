import {initAccount} from './registration/loadWallet';
import {generateAccount} from './registration/generateWallet';
import {calling} from './TESTING/send';
import {genHash, checkHash} from './encryption/encryptBcrypt';
import {encryptKeys} from './encryption/encryptAES';
import {decryptKeys} from './encryption/decryptAES';
import {activateAccount} from './activation/activateFundraiser';
import {delegateAccount} from './delegation/delegate';
import {restoreIdentityWithSecretKey} from './generateFromPk/account';
import {revealAccount} from './reveal/reveal';
import {unlockFundraiserIdentity} from './generatefromMnemonic/account';
import {accountBalance} from './retrieveFunds/index';
import {sendTransaction} from './transfer/send';

import {listPlatforms} from './_INITIALIZE/1_GetPlatform';
import {listNetworks} from './_INITIALIZE/2_GetNetwork';
import {listEntities} from './_INITIALIZE/3_GetEntities';
import {listAttributes} from './_INITIALIZE/4_EntityAttributes';
import {listAttributeValues} from './_INITIALIZE/5_AttributeValue';

import {invokeContract} from './CONTRACT/invokeContract';


// import {generateAccount} from './registration/generateWallet';
// import rootReducer from './reducers/index';

// import {wrapStore} from 'webext-redux';

// const store = createStore(rootReducer);

// wrapStore(store);

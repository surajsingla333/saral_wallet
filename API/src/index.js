import {initAccount} from './registration/loadWallet';
import {generateAccount} from './registration/generateWallet';
import {calling} from './TESTING/send';
import {genHash, checkHash} from './encryption/encryptBcrypt';
import {encryptKeys} from './encryption/encryptAES';
import {decryptKeys} from './encryption/decryptAES';
import {activateAccount} from './activation/activate';
import {delegateAccount} from './delegation/delegate';
import {restoreIdentityWithSecretKey} from './generateFromPk/account';
import {revealAccount} from './reveal/reveal';
import {unlockFundraiserIdentity} from './generatefromMnemonic/account';
// import {generateAccount} from './registration/generateWallet';
// import rootReducer from './reducers/index';

// import {wrapStore} from 'webext-redux';

// const store = createStore(rootReducer);

// wrapStore(store);

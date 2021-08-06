import { combineReducers, createStore } from 'redux';
import authReducer from './AuthReducer';
import scannerReducer from './ScannerReducer';

const rootReducer = combineReducers({ scanner: scannerReducer, auth: authReducer });

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;

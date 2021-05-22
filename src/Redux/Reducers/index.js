import { combineReducers, createStore } from 'redux';
import scannerReducer from './ScannerReducer';

const rootReducer = combineReducers({ scanner: scannerReducer });

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;

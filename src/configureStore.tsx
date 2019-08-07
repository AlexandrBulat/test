import { persistStore, persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootEpic from './epics';
import rootReducer from './reducers'
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';
import humps from 'humps';
import Axios from 'axios';
import { ApiService } from './services';
import { Constants } from './constants/Constants';

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    createTransform(
      (state: any) => {
        return {
          ...state,
          loading: false,
          error: null
        }
      },
      state => state,
      { whitelist: ['movies'] }
    ),
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const baseURL = Constants.BASE_URL;
export const axios = Axios.create({
  baseURL,
});
axios.defaults.headers.common[Constants.CMC_PRO_API_KEY_HEADER] = Constants.CMC_PRO_API_KEY
axios.defaults.transformRequest = [
  (data) => humps.decamelizeKeys(data),
  // @ts-ignore
  ...(axios.defaults.transformRequest || []),
];
axios.defaults.transformResponse = [
  // @ts-ignore
  ... (axios.defaults.transformResponse || []),
  (object) => humps.camelizeKeys(object),
];

const apiService = new ApiService(axios)
const epicMiddleware = createEpicMiddleware({
  dependencies: {
    apiService
  }
});

export default () => {
  const store = createStore(
    persistedReducer,
    applyMiddleware(
      epicMiddleware
    )
  )
  epicMiddleware.run(rootEpic);

  const persistor = persistStore(store)
  return { store, persistor }
}
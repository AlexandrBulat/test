import rootEpic from './epics';
import rootReducer from './reducers'
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';
import { ApiService } from './services';

const apiService = new ApiService()
const epicMiddleware = createEpicMiddleware({
  dependencies: {
    apiService
  }
});

export default () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(
      epicMiddleware
    )
  )
  epicMiddleware.run(rootEpic);
  return { store }
}
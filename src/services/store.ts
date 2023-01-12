import {
  compose,
  legacy_createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

//TODO нужно переписать
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
export const store = legacy_createStore(rootReducer, enhancer);
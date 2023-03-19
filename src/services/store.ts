import {
  compose,
  legacy_createStore,
  applyMiddleware,
} from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from '../utils/ws';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_STOP,
  WS_CONNECTION_ERROR,
  WS_GET_ORDER_DATA,
  WS_CONNECTION_CLOSED,
} from './actions/ws';

import { IWsActions } from './reducers/ws.types';
import { TAppActions } from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const wsActions: IWsActions = {
  onInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onData: WS_GET_ORDER_DATA,
  onStop: WS_CONNECTION_STOP,
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));
export const store = legacy_createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, never, TAppActions>;
export type AppDispatch = ThunkDispatch<RootState, never, TAppActions>;
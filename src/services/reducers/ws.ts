import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_ORDER_DATA,
  WS_CONNECTION_STOP,
} from '../actions/ws';
import { TWsActions } from './ws.types';
import { TOrderData } from './order.types';

export type TWsState = {
  wsConnected: boolean;
  commonFeed: TOrderData | null;
  userFeed: TOrderData | null;
  errorMessage: string | null;
};

const initialState: TWsState = {
  wsConnected: false,
  commonFeed: null,
  userFeed: null,
  errorMessage: null,
};

export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        commonFeed: null,
        wsConnected: true,
        errorMessage: null,
      };
    case WS_CONNECTION_STOP:
      return {
        ...state,
        wsConnected: false,
        commonFeed: null,
        errorMessage: null,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        errorMessage: null,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        errorMessage: action.payload,
      };
    case WS_GET_ORDER_DATA:
      if (action.payload?.secured) {
        return {
          ...state,
          userFeed: action.payload,
          errorMessage: null,
        };
      }
      return {
        ...state,
        commonFeed: action.payload,
        errorMessage: null,
      };
    default:
      return state;
  }
};
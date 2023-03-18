import { TOrderData } from "./order.types";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_GET_ORDER_DATA,
  WS_CONNECTION_STOP,
} from '../actions/ws';

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IWsConnectionStopAction {
  readonly type: typeof WS_CONNECTION_STOP;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload: Event | null;
}

export interface IWsGetOrderDataAction {
  readonly type: typeof WS_GET_ORDER_DATA;
  readonly payload: TOrderData | null;
}

export type TWsActions =
  | IWsConnectionStartAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionStopAction
  | IWsConnectionClosedAction
  | IWsGetOrderDataAction

export interface IWsActions {
  onInit: typeof WS_CONNECTION_START;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onData: typeof WS_GET_ORDER_DATA;
  onStop: typeof WS_CONNECTION_STOP;
}
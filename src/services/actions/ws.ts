import { getCookie } from "../../utils/cookies";
import { TOrderData } from "../reducers/order.types";
import { AppDispatch, AppThunk } from "../store";
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_STOP: 'WS_CONNECTION_STOP' = 'WS_CONNECTION_STOP';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDER_DATA: 'WS_GET_ORDER_DATA' = 'WS_GET_ORDER_DATA';

export const getWsConnectionStartAction: AppThunk = (url: string, secured: boolean) => (dispatch: AppDispatch) => {
  let token: string | undefined = '';
  if (secured) {
    token = getCookie('accessToken')?.replace('Bearer ', '')
  }
  return dispatch({
    type: WS_CONNECTION_START,
    payload: token ? `${url}?token=${token}` : url,
  })
};

export const getWsConnectionSuccessAction: AppThunk = () => (dispatch: AppDispatch) => dispatch({
  type: WS_CONNECTION_SUCCESS,
});

export const getWsConnectionErrorAction: AppThunk = (message: string) => (dispatch: AppDispatch) => dispatch({
  type: WS_CONNECTION_ERROR,
  payload: message
});

export const getWsConnectionStopAction: AppThunk = () => (dispatch: AppDispatch) => dispatch({
  type: WS_CONNECTION_STOP,
});

export const getWsConnectionClosedAction: AppThunk = (payload: string) => (dispatch: AppDispatch) => dispatch({
  type: WS_CONNECTION_CLOSED,
  payload,
});

export const getWsGetOrderDataAction: AppThunk = (orderData: TOrderData) => (dispatch: AppDispatch) => dispatch({
  type: WS_GET_ORDER_DATA,
  payload: orderData,
});
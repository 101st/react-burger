import { TOrderData } from "../reducers/order.types";
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_STOP: 'WS_CONNECTION_STOP' = 'WS_CONNECTION_STOP';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDER_DATA: 'WS_GET_ORDER_DATA' = 'WS_GET_ORDER_DATA';

export const getWsConnectionStartAction = (url: string) => {
    return {
      type: WS_CONNECTION_START,
      payload: url,
    };
  };
  
  export function getWsConnectionSuccessAction() {
    return {
      type: WS_CONNECTION_SUCCESS,
    };
  }
  
  export function getWsConnectionErrorAction(message: string) {
    return {
      type: WS_CONNECTION_ERROR,
      payload: message
    };
  }
  
  export function getWsConnectionStopAction() {
    return {
      type: WS_CONNECTION_STOP,
    };
  }
  
  export function getWsConnectionClosedAction(payload: string) {
    return {
      type: WS_CONNECTION_CLOSED,
      payload,
    };
  }
  
  export function getWsGetOrderDataAction(orderData: TOrderData) {
    return {
      type: WS_GET_ORDER_DATA,
      payload: orderData,
    };
  }
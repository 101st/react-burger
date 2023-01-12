import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLEAR_ORDER,
} from '../actions/order';

type TOrderRequestActions = {
  type: (typeof GET_ORDER_REQUEST | typeof GET_ORDER_FAILED | typeof CLEAR_ORDER),
}

type TGetOrderSuccessAction = {
  type: typeof GET_ORDER_SUCCESS,
  order: number,
  name: string,
};

export type TOrderActions = (
  TOrderRequestActions |
  TGetOrderSuccessAction
);
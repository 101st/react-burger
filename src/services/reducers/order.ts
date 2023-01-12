import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLEAR_ORDER,
} from '../actions/order';

import { TOrderActions } from './order.types';

type TOrderState = {
  order: number | null,
  name: string | null,
  isOpen: boolean,
  getOrderRequest: boolean,
  getOrderFailed: boolean,
}

const initialState = {
  order: null,
  name: null,
  isOpen: false,
  getOrderRequest: false,
  getOrderFailed: false,
};

export const orderReducer = (state: TOrderState = initialState, action: TOrderActions) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        getOrderRequest: true,
        getOrderFailed: false,
        isOpen: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        name: action.name,
        getOrderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        getOrderFailed: true,
        getOrderRequest: false,
      };
    }
    case CLEAR_ORDER: {
      return {
        ...state,
        order: null,
        name: null,
        isOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};
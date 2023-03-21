import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLEAR_ORDER,
} from '../actions/order';
import { IIngredient } from './constructor.types';

type TOrderRequestActions = {
  type: (
    typeof GET_ORDER_REQUEST | typeof GET_ORDER_FAILED | typeof CLEAR_ORDER
    )
}

type TGetOrderSuccessAction = {
  type: typeof GET_ORDER_SUCCESS,
  order: TOrder,
  name: string,
};

export type TOrderActions = (
  TOrderRequestActions |
  TGetOrderSuccessAction
);

export type TOrder = {
  _id: string,
  number: number,
  name?: string,
  ingredients: string[],
  status: string,
  createdAt: string,
  updatedAt: string,
}

export type IOrderIngredient = {
  _id: string;
  ingredient: IIngredient,
  count?: number,
}

export type TOrderData = {
  orders: TOrder[],
  total: number,
  totalToday: number,
  secured: boolean | undefined,
}
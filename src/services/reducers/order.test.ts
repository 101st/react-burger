import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../actions/order";
import { orderReducer } from "./order";

import { initialState } from './order'

jest.mock("nanoid", () => {
  return {
    nanoid: () => { }
  }
});

const ORDER = {
  _id: '1',
  number: 1,
  ingredients: ['ing_1'],
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}

describe('orderReducer', () => {
  it('Initial state', () => {
    // @ts-ignore
    expect(orderReducer(undefined, {}))
      .toEqual(initialState)
  })
  it('GET_ORDER_REQUEST', () => {
    expect(orderReducer(undefined, {
      type: GET_ORDER_REQUEST
    })).toEqual({
      ...initialState,
      getOrderRequest: true,
      isOpen: true
    })
  })
  it('GET_ORDER_SUCCESS', () => {
    expect(orderReducer(undefined, {
      type: GET_ORDER_SUCCESS,
      order: ORDER,
      name: 'ORDER'
    })).toEqual({
      ...initialState,
      order: ORDER,
      name: 'ORDER',
      getOrderSuccess: true
    })
  })
  it('GET_ORDER_FAILED', () => {
    expect(orderReducer(undefined, {
      type: GET_ORDER_FAILED
    })).toEqual({
      ...initialState,
      getOrderFailed: true,
    })
  })
});
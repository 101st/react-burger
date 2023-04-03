import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_STOP, WS_CONNECTION_SUCCESS, WS_GET_ORDER_DATA } from "../actions/ws";
import { wsReducer } from "./ws";

import { initialState } from './ws'

const ORDER = {
  _id: '1',
  number: 1,
  ingredients: ['ing_1'],
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}

describe('wsReducer', () => {
  it('Initial state', () => {
    // @ts-ignore
    expect(wsReducer(undefined, {}))
      .toEqual(initialState)
  })
  it('WS_CONNECTION_SUCCESS', () => {
    expect(wsReducer(undefined, {
      type: WS_CONNECTION_SUCCESS
    })).toEqual({
      ...initialState,
      wsConnected: true
    })
  })
  it('WS_CONNECTION_STOP', () => {
    expect(wsReducer(undefined, {
      type: WS_CONNECTION_STOP,
    })).toEqual({
      ...initialState,
      wsConnected: false
    })
  })
  it('WS_CONNECTION_CLOSED', () => {
    expect(wsReducer(undefined, {
      type: WS_CONNECTION_CLOSED,
    })).toEqual({
      ...initialState,
      wsConnected: false,
    })
  })
  it('WS_CONNECTION_ERROR', () => {
    expect(wsReducer(undefined, {
      type: WS_CONNECTION_ERROR,
      payload: 'payload'
    })).toEqual({
      ...initialState,
      errorMessage: 'payload'
    })
  })
  it('WS_GET_ORDER_DATA -> SECURED', () => {
    expect(wsReducer(undefined, {
      type: WS_GET_ORDER_DATA,
      payload: {
        orders: [ORDER],
        total: 1,
        totalToday: 1,
        secured: true,
      }
    })).toEqual({
      ...initialState,
      userFeed: {
        orders: [ORDER],
        total: 1,
        totalToday: 1,
        secured: true,
      }
    })
  })
  it('WS_GET_ORDER_DATA -> NO SECURED', () => {
    expect(wsReducer(undefined, {
      type: WS_GET_ORDER_DATA,
      payload: {
        orders: [ORDER],
        total: 1,
        totalToday: 1,
        secured: undefined,
      }
    })).toEqual({
      ...initialState,
      commonFeed: {
        orders: [ORDER],
        total: 1,
        totalToday: 1,
        secured: undefined,
      }
    })
  })
});
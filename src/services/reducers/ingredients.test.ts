import { ingredientsReducer } from "./ingredients";

import { initialState } from './ingredients'

import { GET_INGRIDIENTS_FAILED, GET_INGRIDIENTS_REQUEST, GET_INGRIDIENTS_SUCCESS } from "../actions/ingredients";

const BUN = {
  _id: "60d3b41abdacab0026a733c6",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  __v: 0,
}

describe('ingredientsReducer', () => {
  it('Initial state', () => {
    // @ts-ignore
    expect(ingredientsReducer(undefined, {}))
      .toEqual(initialState)
  })
  it('GET_INGRIDIENTS_REQUEST', () => {
    expect(ingredientsReducer(undefined, {
      type: GET_INGRIDIENTS_REQUEST
    })).toEqual({
      ...initialState,
      getIngredientsRequest: true,
    })
  })
  it('GET_INGRIDIENTS_SUCCESS', () => {
    expect(ingredientsReducer(undefined, {
      type: GET_INGRIDIENTS_SUCCESS,
      ingredients: [BUN]
    })).toEqual({
      ...initialState,
      ingredients: [BUN]
    })
  })
  it('GET_INGRIDIENTS_FAILED', () => {
    expect(ingredientsReducer(undefined, {
      type: GET_INGRIDIENTS_FAILED
    })).toEqual({
      ...initialState,
      getIngredientsFailed: true,
    })
  })
});
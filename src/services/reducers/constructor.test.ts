import { constructorReducer } from "./constructor";

import { initialState } from './constructor'

import { ADD_INGREDIENT, CLEAR_CONSTRUCTOR, DRAG_INGREDIENT, REMOVE_INGREDIENT, SET_TOTAL_PRICE } from "../actions/constructor";

jest.mock("nanoid", () => {
  return {
    nanoid: () => { }
  }
});

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

const NO_BUN = {
  calories: 420,
  carbohydrates: 33,
  fat: 244,
  image: "https://code.s3.yandex.net/react/code/meat-02.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  name: "Мясо бессмертных моллюсков Protostomia",
  price: 1337,
  proteins: 433,
  type: "main",
  __v: 0,
  _id: "60d3b41abdacab0026a733c9",
}

describe('constructorReducer', () => {
  it('Initial state', () => {
    // @ts-ignore
    expect(constructorReducer(undefined, {}))
      .toEqual(initialState)
  })


  it('ADD_INGREDIENT -> ADD BUN', () => {
    expect(constructorReducer(undefined, {
      type: ADD_INGREDIENT,
      ingredient: BUN
    })).toEqual({
      ...initialState,
      bun: BUN,
      constructorIngredients: [BUN, BUN]
    })
  })
  it('ADD_INGREDIENT -> ADD ANY', () => {
    expect(constructorReducer(undefined, {
      type: ADD_INGREDIENT,
      ingredient: NO_BUN
    })).toEqual({
      ...initialState,
      constructorIngredients: [NO_BUN]
    })
  })
  it('REMOVE_INGREDIENT', () => {
    expect(constructorReducer({
      constructorIngredients: [
        BUN
      ],
      bun: BUN,
      totalPrice: 0
    }, {
      type: REMOVE_INGREDIENT,
      ingredient: BUN
    })).toEqual({
      ...initialState,
      bun: BUN,
      constructorIngredients: []
    })
  })
  it('DRAG_INGREDIENT', () => {
    expect(constructorReducer({
      constructorIngredients: [BUN, NO_BUN],
      bun: BUN,
      totalPrice: 0
    }, {
      type: DRAG_INGREDIENT,
      dragIndex: 0,
      hoverIndex: 1,
      ingredient: BUN
    })).toEqual({
      ...initialState,
      bun: BUN,
      constructorIngredients: [NO_BUN, BUN]
    })
  })
  it('CLEAR_CONSTRUCTOR', () => {
    expect(constructorReducer(undefined, {
      type: CLEAR_CONSTRUCTOR
    })).toEqual({
      ...initialState,
    })
  })
  it('SET_TOTAL_PRICE', () => {
    expect(constructorReducer(undefined, {
      type: SET_TOTAL_PRICE,
      data: 1000
    })).toEqual({
      ...initialState,
      totalPrice: 1000
    })
  })
});
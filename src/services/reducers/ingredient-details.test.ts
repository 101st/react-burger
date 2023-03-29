import { ingredientDetailsReducer } from "./ingredient-details";

import { initialState } from './ingredient-details'

import { CLEAR_INGREDIENT_DETAILS } from "../actions/ingredient-details";

describe('ingredientDetailsReducer', () => {
  it('Initial state', () => {
    // @ts-ignore
    expect(ingredientDetailsReducer(undefined, {}))
      .toEqual(initialState)
  })
  it('CLEAR_INGREDIENT_DETAILS', () => {
    expect(ingredientDetailsReducer(undefined, {
      type: CLEAR_INGREDIENT_DETAILS
    })).toEqual({
      ...initialState,
    })
  })
});
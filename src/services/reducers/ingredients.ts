import {
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_SUCCESS,
  GET_INGRIDIENTS_FAILED,
} from '../actions/ingredients';

import { TIngredientsActions } from './ingredients.types';
import { IIngredient } from './constructor.types';

export type TIngredientsState = {
  ingredients: IIngredient[],
  getIngredientsRequest: boolean,
  getIngredientsFailed: boolean,
  currentIngredient: {
    name: string,
  },
}

const initialState = {
  ingredients: [],
  getIngredientsRequest: false,
  getIngredientsFailed: false,
  currentIngredient: {
    name: ''
  }
};

export const ingredientsReducer = (state: TIngredientsState = initialState, action: TIngredientsActions) => {
  switch (action.type) {
    case GET_INGRIDIENTS_REQUEST: {
      return {
        ...state,
        getIngredientsRequest: true,
        getIngredientsFailed: false,
      };
    }
    case GET_INGRIDIENTS_SUCCESS: {
      return {
        ...state,
        getIngredientsRequest: false,
        ingredients: action.ingredients,
      };
    }
    case GET_INGRIDIENTS_FAILED: {
      return {
        ...state,
        getIngredientsRequest: false,
        getIngredientsFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
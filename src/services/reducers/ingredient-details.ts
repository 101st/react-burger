import {
  CLEAR_INGREDIENT_DETAILS,
  SET_INGREDIENT_DETAILS,
} from '../actions/ingredient-details';

import { TIngredientDetailsActions } from './ingredient-details.types';

export type TIngredientDetailsState = {
  ingredientDetails: object,
  isOpen: boolean,
};

export const initialState = {
  ingredientDetails: {},
  isOpen: false,
};

export const ingredientDetailsReducer = (state: TIngredientDetailsState = initialState, action: TIngredientDetailsActions) => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.ingredient,
        isOpen: true,
      };
    }
    case CLEAR_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: {},
        isOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};
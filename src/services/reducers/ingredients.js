import {
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_SUCCESS,
  GET_INGRIDIENTS_FAILED,
  SET_CURRENT_INGREDIENT,
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  getIngredientsRequest: false,
  getIngredientsFailed: false,
  currentIngredient: null
};

export const ingredientsReducer = (state = initialState, action) => {
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
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.currentIngredient,
      };
    }
    default: {
      return state;
    }
  }
};
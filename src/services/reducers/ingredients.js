import {
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_SUCCESS,
  GET_INGRIDIENTS_FAILED,
  SET_CURRENT_INGREDIENT_TYPE,
  SET_INGRIDIENTS_STORE,
  SET_CURRENT_INGREDIENT,
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  ingredientsStore: [],
  getIngredientsRequest: false,
  getIngredientsFailed: false,
  currentIngredientType: 'main',
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
    case SET_CURRENT_INGREDIENT_TYPE: {
      return {
        ...state,
        currentIngredientType: action.currentIngredientType,
      };
    }
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.currentIngredient,
      };
    }
    case SET_INGRIDIENTS_STORE: {
      return {
        ...state,
        ingredientsStore: state.ingredients.filter(item => item.type === action.currentIngredientType)
      };
    }
    default: {
      return state;
    }
  }
};
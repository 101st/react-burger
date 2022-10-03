import { BASE_URL } from "../../utils/const";
import { checkResponse } from "../../utils/common";

export const GET_INGRIDIENTS_REQUEST = "GET_INGRIDIENTS_REQUEST";
export const GET_INGRIDIENTS_SUCCESS = "GET_INGRIDIENTS_SUCCESS";
export const GET_INGRIDIENTS_FAILED = "GET_INGRIDIENTS_FAILED";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGRIDIENTS_REQUEST,
    });
    fetch(`${BASE_URL}/api/ingredients`)
      .then(checkResponse)
      .then((json) => {
        if (json.success)
          dispatch({
            type: GET_INGRIDIENTS_SUCCESS,
            ingredients: json.data,
          });
        else {
          dispatch({
            type: GET_INGRIDIENTS_FAILED,
          });
          throw new Error('Ошибка ответа сервера');
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_INGRIDIENTS_FAILED,
        });
        console.error(error);
      });
  };
};

export const SET_CURRENT_INGREDIENT_TYPE = 'SET_CURRENT_INGREDIENT_TYPE';

export const setCurrentIngredientType = (currentIngredientType) => ({
  type: SET_CURRENT_INGREDIENT_TYPE,
  currentIngredientType,
});

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';

export const setCurrentIngredient = (currentIngredient) => ({
  type: SET_CURRENT_INGREDIENT,
  currentIngredient
});

export const SET_INGRIDIENTS_STORE = 'SET_INGRIDIENTS_STORE';

export const setIngredientsStore = (currentIngredientType) => ({
  type: SET_INGRIDIENTS_STORE,
  currentIngredientType,
});
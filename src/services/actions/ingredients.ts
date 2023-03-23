import { BASE_URL } from '../../utils/const';
import { checkResponse } from '../../utils/common';
import { AppDispatch, AppThunk } from '../store';

export const GET_INGRIDIENTS_REQUEST = 'GET_INGRIDIENTS_REQUEST';
export const GET_INGRIDIENTS_SUCCESS = 'GET_INGRIDIENTS_SUCCESS';
export const GET_INGRIDIENTS_FAILED = 'GET_INGRIDIENTS_FAILED';

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGRIDIENTS_REQUEST,
  });
  fetch(`${BASE_URL}/api/ingredients`)
    .then(checkResponse)
    .then((json) => {
      if (json.success) {
        dispatch({
          type: GET_INGRIDIENTS_SUCCESS,
          ingredients: json.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_INGRIDIENTS_FAILED,
      });
      console.error(error);
    });
};
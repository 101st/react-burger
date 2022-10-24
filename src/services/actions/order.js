import { BASE_URL } from '../../utils/const';
import { checkResponse } from '../../utils/common';
import { clearConstructor } from './constructor';

export const CLEAR_ORDER = 'CLEAR_ORDER';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const getOrder = (ingredientsId) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ingredients: ingredientsId,
      }),
    })
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: json.order,
            name: json.name,
          });
          dispatch(clearConstructor());
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
        console.error(error);
      });
  };
};
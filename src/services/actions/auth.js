import { BASE_URL } from "../../utils/const";
import { checkResponse } from "../../utils/common";

export const GET_FORGOT_PASSWORD_REQUEST = "GET_FORGOT_PASSWORD_REQUEST";
export const GET_FORGOT_PASSWORD_SUCCESS = "GET_FORGOT_PASSWORD_SUCCESS";
export const GET_FORGOT_PASSWORD_FAILED = "GET_FORGOT_PASSWORD_FAILED";

export const getForgotPassword = (email) => {
  return function (dispatch) {
    dispatch({
      type: GET_FORGOT_PASSWORD_REQUEST,
    });
    fetch(`${BASE_URL}/api/password-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch({
            type: GET_FORGOT_PASSWORD_SUCCESS,
            message: json.message,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_FORGOT_PASSWORD_FAILED,
        });
        console.error(error);
      });
  };
};
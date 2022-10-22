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

export const GET_RESET_PASSWORD_REQUEST = "GET_RESET_PASSWORD_REQUEST";
export const GET_RESET_PASSWORD_SUCCESS = "GET_RESET_PASSWORD_SUCCESS";
export const GET_RESET_PASSWORD_FAILED = "GET_RESET_PASSWORD_FAILED";

export const getResetPassword = (password, token) => {
  return function (dispatch) {
    dispatch({
      type: GET_RESET_PASSWORD_REQUEST,
    });
    fetch(`${BASE_URL}/api/password-reset/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch({
            type: GET_RESET_PASSWORD_SUCCESS,
            message: json.message,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_RESET_PASSWORD_FAILED,
        });
        console.error(error);
      });
  };
};

export const GET_REGISTER_REQUEST = "GET_REGISTER_REQUEST";
export const GET_REGISTER_SUCCESS = "GET_REGISTER_SUCCESS";
export const GET_REGISTER_FAILED = "GET_REGISTER_FAILED";

export const getRegister = ({ email, password, name }) => {
  console.log(email, password, name)
  return function (dispatch) {
    dispatch({
      type: GET_REGISTER_REQUEST,
    });
    fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch({
            type: GET_REGISTER_SUCCESS,
            data: json,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_REGISTER_FAILED,
        });
        console.error(error);
      });
  };
};
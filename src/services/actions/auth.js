import { BASE_URL } from '../../utils/const';
import { checkResponse } from '../../utils/common';
import { getCookie } from '../../utils/cookies';

export const GET_FORGOT_PASSWORD_REQUEST = 'GET_FORGOT_PASSWORD_REQUEST';
export const GET_FORGOT_PASSWORD_SUCCESS = 'GET_FORGOT_PASSWORD_SUCCESS';
export const GET_FORGOT_PASSWORD_FAILED = 'GET_FORGOT_PASSWORD_FAILED';

export const getForgotPassword = (email) => {
  return function (dispatch) {
    dispatch({
      type: GET_FORGOT_PASSWORD_REQUEST,
    });
    fetch(`${BASE_URL}/api/password-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

export const GET_RESET_PASSWORD_REQUEST = 'GET_RESET_PASSWORD_REQUEST';
export const GET_RESET_PASSWORD_SUCCESS = 'GET_RESET_PASSWORD_SUCCESS';
export const GET_RESET_PASSWORD_FAILED = 'GET_RESET_PASSWORD_FAILED';

export const getResetPassword = (password, token) => {
  return function (dispatch) {
    dispatch({
      type: GET_RESET_PASSWORD_REQUEST,
    });
    fetch(`${BASE_URL}/api/password-reset/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

export const GET_REGISTER_REQUEST = 'GET_REGISTER_REQUEST';
export const GET_REGISTER_SUCCESS = 'GET_REGISTER_SUCCESS';
export const GET_REGISTER_FAILED = 'GET_REGISTER_FAILED';

export const getRegister = ({ email, password, name }) => {
  return function (dispatch) {
    dispatch({
      type: GET_REGISTER_REQUEST,
    });
    fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILED = 'GET_LOGIN_FAILED';

export const getLogin = ({ email, password }) => {
  return function (dispatch) {
    dispatch({
      type: GET_LOGIN_REQUEST,
    });
    fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch({
            type: GET_LOGIN_SUCCESS,
            data: json,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_LOGIN_FAILED,
        });
        console.error(error);
      });
  };
};

export const GET_REFRESH_TOKEN_REQUEST = 'GET_REFRESH_TOKEN_REQUEST';
export const GET_REFRESH_TOKEN_SUCCESS = 'GET_REFRESH_TOKEN_SUCCESS';
export const GET_REFRESH_TOKEN_FAILED = 'GET_REFRESH_TOKEN_FAILED';

export const getRefreshToken = () => {
  return function (dispatch) {
    dispatch({
      type: GET_REFRESH_TOKEN_REQUEST,
    });
    fetch(`${BASE_URL}/api/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    })
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch({
            type: GET_REFRESH_TOKEN_SUCCESS,
            data: json,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_REFRESH_TOKEN_FAILED,
        });
        console.error(error);
      });
  };
};

export const GET_LOGOUT_REQUEST = 'GET_LOGOUT_REQUEST';
export const GET_LOGOUT_SUCCESS = 'GET_LOGOUT_SUCCESS';
export const GET_LOGOUT_FAILED = 'GET_LOGOUT_FAILED';

export const getLogout = () => {
  return function (dispatch) {
    dispatch({
      type: GET_LOGOUT_REQUEST,
    });
    fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
      }),
    })
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch({
            type: GET_LOGOUT_SUCCESS,
            data: json,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_LOGOUT_FAILED,
        });
        console.error(error);
      });
  };
};

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const getUser = () => {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    fetch(`${BASE_URL}/api/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': getCookie('accessToken'),
      },
    })
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            data: json,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_FAILED,
        });
        console.error(error);
      });
  };
};

export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED = 'PATCH_USER_FAILED';

export const patchUser = (user) => {
  return function (dispatch) {
    dispatch({
      type: PATCH_USER_REQUEST,
    });
    fetch(`${BASE_URL}/api/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': getCookie('accessToken'),
      },
      body: JSON.stringify({
        user,
      }),
    })
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch({
            type: PATCH_USER_SUCCESS,
            data: json,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: PATCH_USER_FAILED,
        });
        console.error(error);
      });
  };
};
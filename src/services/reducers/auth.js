import {
  GET_FORGOT_PASSWORD_REQUEST,
  GET_FORGOT_PASSWORD_SUCCESS,
  GET_FORGOT_PASSWORD_FAILED,
  GET_RESET_PASSWORD_REQUEST,
  GET_RESET_PASSWORD_SUCCESS,
  GET_RESET_PASSWORD_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_REFRESH_TOKEN_REQUEST,
  GET_REFRESH_TOKEN_SUCCESS,
  GET_REFRESH_TOKEN_FAILED,
} from "../actions/auth";

const initialState = {
  getForgotPasswordResponseMessage: false,
  getForgotPasswordRequest: false,
  getForgotPasswordFailed: false,

  getResetPasswordResponseMessage: false,
  getResetPasswordRequest: false,
  getResetPasswordFailed: false,

  getLoginRequest: false,
  getLoginFailed: false,
  user: null,
  accessToken: null,

  getRefreshTokenRequest: false,
  getRefreshTokenFailed: false,

};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Forgot password
    case GET_FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        getForgotPasswordResponse: false,
        getForgotPasswordRequest: true,
        getForgotPasswordFailed: false,
      };
    }
    case GET_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        getForgotPasswordRequest: false,
        getForgotPasswordResponseMessage: action.message === 'Reset email sent',
      };
    }
    case GET_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        getForgotPasswordRequest: false,
        getForgotPasswordFailed: true,
      };
    }
    // Reset password
    case GET_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        getResetPasswordResponse: false,
        getResetPasswordRequest: true,
        getResetPasswordFailed: false,
      };
    }
    case GET_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        getResetPasswordRequest: false,
        getResetPasswordResponseMessage: action.message === 'Reset email sent',
      };
    }
    case GET_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        getResetPasswordRequest: false,
        getResetPasswordFailed: true,
      };
    }
    // Login
    case GET_LOGIN_REQUEST: {
      return {
        ...state,
        getLoginResponse: false,
        getLoginRequest: true,
        getLoginFailed: false,
      };
    }
    case GET_LOGIN_SUCCESS: {
      localStorage.setItem('refreshToken', action.data?.refreshToken);
      return {
        ...state,
        getLoginRequest: false,
        user: action.data?.user,
        accessToken: action.data?.accessToken,
      };
    }
    case GET_LOGIN_FAILED: {
      return {
        ...state,
        getLoginRequest: false,
        getLoginFailed: true,
      };
    }
    // Refresh token
    case GET_REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        getRefreshTokenResponse: false,
        getRefreshTokenRequest: true,
        getRefreshTokenFailed: false,
      };
    }
    case GET_REFRESH_TOKEN_SUCCESS: {
      localStorage.setItem('refreshToken', action.data?.refreshToken);
      return {
        ...state,
        getRefreshTokenRequest: false,
        accessToken: action.data?.accessToken,
      };
    }
    case GET_REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        getRefreshTokenRequest: false,
        getRefreshTokenFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
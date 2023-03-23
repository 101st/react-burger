import { setCookie, removeCookie } from '../../utils/cookies';
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
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS,
  GET_REGISTER_FAILED,
  GET_REFRESH_TOKEN_REQUEST,
  GET_REFRESH_TOKEN_SUCCESS,
  GET_REFRESH_TOKEN_FAILED,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
} from '../actions/auth';

import { EXPIRES_AUTH_TIME } from '../../utils/const';
import { TAuthActions } from './auth.types';
import { TUser } from './auth.types'

export interface TAuthState {
  getForgotPasswordRequest: boolean,
  getForgotPasswordSuccess: boolean,
  getForgotPasswordFailed: boolean,

  getResetPasswordRequest: boolean,
  getResetPasswordSuccess: boolean,
  getResetPasswordFailed: boolean,

  getRegisterRequest: boolean,
  getRegisterSuccess: boolean,
  getRegisterFailed: boolean,
  getLoginRequest: boolean,
  getLoginSuccess: boolean,
  getLoginFailed: boolean,
  user: TUser,

  getRefreshTokenRequest: boolean,
  getRefreshTokenSuccess: boolean,
  getRefreshTokenFailed: boolean,

  getLogoutRequest: boolean,
  getLogoutSuccess: boolean,
  getLogoutFailed: boolean,

  getUserRequest: boolean,
  getUserSuccess: boolean,
  getUserFailed: boolean,

  patchUserRequest: boolean,
  patchUserSuccess: boolean,
  patchUserFailed: boolean,
}

const initialState: TAuthState = {
  getForgotPasswordRequest: false,
  getForgotPasswordSuccess: false,
  getForgotPasswordFailed: false,

  getResetPasswordRequest: false,
  getResetPasswordSuccess: false,
  getResetPasswordFailed: false,

  getRegisterRequest: false,
  getRegisterSuccess: false,
  getRegisterFailed: false,
  getLoginRequest: false,
  getLoginSuccess: false,
  getLoginFailed: false,
  user: {
    name: '',
    email: '',
    password: ''
  },

  getRefreshTokenRequest: false,
  getRefreshTokenSuccess: false,
  getRefreshTokenFailed: false,

  getLogoutRequest: false,
  getLogoutSuccess: false,
  getLogoutFailed: false,

  getUserRequest: false,
  getUserSuccess: false,
  getUserFailed: false,

  patchUserRequest: false,
  patchUserSuccess: false,
  patchUserFailed: false,
};

export const authReducer = (state: TAuthState = initialState, action: TAuthActions) => {
  switch (action.type) {

    // Forgot password
    case GET_FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        getForgotPasswordRequest: true,
        getForgotPasswordSuccess: false,
        getForgotPasswordFailed: false,
      };
    }
    case GET_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        getForgotPasswordRequest: false,
        getForgotPasswordSuccess: action.message === 'Reset email sent',
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
        getResetPasswordRequest: true,
        getResetPasswordSuccess: false,
        getResetPasswordFailed: false,
      };
    }
    case GET_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        getResetPasswordRequest: false,
        getResetPasswordSuccess: action.message === 'Password successfully reset',
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
        getLoginRequest: true,
        getLoginSuccess: false,
        getLoginFailed: false,
      };
    }
    case GET_LOGIN_SUCCESS: {
      localStorage.setItem('refreshToken', action.data?.refreshToken);
      setCookie('accessToken', action.data?.accessToken, { expires: EXPIRES_AUTH_TIME });
      return {
        ...state,
        getLoginRequest: false,
        getLoginSuccess: true,
        user: { ...state.user, ...action.data?.user },
      };
    }
    case GET_LOGIN_FAILED: {
      return {
        ...state,
        getLoginRequest: false,
        getLoginFailed: true,
      };
    }

    // Register
    case GET_REGISTER_REQUEST: {
      return {
        ...state,
        getRegisterRequest: true,
        getRegisterSuccess: false,
        getRegisterFailed: false,
      };
    }
    case GET_REGISTER_SUCCESS: {
      localStorage.setItem('refreshToken', action.data?.refreshToken);
      setCookie('accessToken', action.data?.accessToken, { expires: EXPIRES_AUTH_TIME });
      return {
        ...state,
        getRegisterRequest: false,
        getRegisterSuccess: true,
        user: { ...state.user, ...action.data?.user },
      };
    }
    case GET_REGISTER_FAILED: {
      return {
        ...state,
        getRegisterRequest: false,
        getRegisterFailed: true,
      };
    }

    // Refresh token
    case GET_REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        getRefreshTokenRequest: true,
        getRefreshTokenSuccess: false,
        getRefreshTokenFailed: false,
      };
    }
    case GET_REFRESH_TOKEN_SUCCESS: {
      localStorage.setItem('refreshToken', action.data?.refreshToken);
      setCookie('accessToken', action.data?.accessToken, { expires: EXPIRES_AUTH_TIME });
      return {
        ...state,
        getRefreshTokenRequest: false,
        getRefreshTokenSuccess: true,
      };
    }
    case GET_REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        getRefreshTokenRequest: false,
        getRefreshTokenFailed: true,
      };
    }

    // Logout
    case GET_LOGOUT_REQUEST: {
      return {
        ...state,
        getLogoutRequest: true,
        getLogoutSuccess: false,
        getLogoutFailed: false,
      };
    }
    case GET_LOGOUT_SUCCESS: {
      localStorage.removeItem('refreshToken');
      removeCookie('accessToken');
      return {
        ...state,
        getLogoutRequest: false,
        getLogoutSuccess: action.message === 'Successful logout',
        getLoginSuccess: false,
      };
    }
    case GET_LOGOUT_FAILED: {
      return {
        ...state,
        getLogoutRequest: false,
        getLogoutFailed: true,
      };
    }

    // Get User
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserSuccess: false,
        getUserFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        user: { ...state.user, ...action.data?.user },
        getUserSuccess: action.message === 'Successful logout',
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: true,
      };
    }

    // Patch User
    case PATCH_USER_REQUEST: {
      return {
        ...state,
        patchUserRequest: true,
        patchUserSuccess: false,
        patchUserFailed: false,
      };
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        patchUserRequest: false,
        user: { ...state.user, ...action.data?.user },
        patchUserSuccess: action.message === 'Successful logout',
      };
    }
    case PATCH_USER_FAILED: {
      return {
        ...state,
        patchUserRequest: false,
        patchUserFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
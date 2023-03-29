import { authReducer } from "./auth";

import { initialState } from '../reducers/auth'

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
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
} from '../actions/auth';

describe('authReducer', () => {
  it('Initial state', () => {
    // @ts-ignore
    expect(authReducer(undefined, {})).toEqual(initialState)
  })


  it('GET_FORGOT_PASSWORD_REQUEST', () => {
    expect(authReducer(undefined, {
      type: GET_FORGOT_PASSWORD_REQUEST
    })).toEqual({
      ...initialState,
      getForgotPasswordRequest: true,
    })
  })
  it('GET_FORGOT_PASSWORD_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: GET_FORGOT_PASSWORD_SUCCESS,
      message: "Reset email sent",
      success: true
    })).toEqual({
      ...initialState,
      getForgotPasswordSuccess: true,
    })
  })
  it('GET_FORGOT_PASSWORD_FAILED', () => {
    expect(authReducer(undefined, {
      type: GET_FORGOT_PASSWORD_FAILED
    })).toEqual({
      ...initialState,
      getForgotPasswordFailed: true,
    })
  })


  it('GET_RESET_PASSWORD_REQUEST', () => {
    expect(authReducer(undefined, {
      type: GET_RESET_PASSWORD_REQUEST
    })).toEqual({
      ...initialState,
      getResetPasswordRequest: true,
    })
  })
  it('GET_RESET_PASSWORD_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: GET_RESET_PASSWORD_SUCCESS,
      message: 'Password successfully reset',
      success: true
    })).toEqual({
      ...initialState,
      getResetPasswordSuccess: true,
    })
  })
  it('GET_RESET_PASSWORD_FAILED', () => {
    expect(authReducer(undefined, {
      type: GET_RESET_PASSWORD_FAILED
    })).toEqual({
      ...initialState,
      getResetPasswordFailed: true,
    })
  })


  it('GET_LOGIN_REQUEST', () => {
    expect(authReducer(undefined, {
      type: GET_LOGIN_REQUEST
    })).toEqual({
      ...initialState,
      getLoginRequest: true,
    })
  })
  it('GET_LOGIN_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: GET_LOGIN_SUCCESS,
      data: {
        refreshToken: 'very long token',
        accessToken: 'very long token',
        success: true,
        user: {
          name: 'potorochinau',
          email: 'potorochinau@ya.ru',
          password: ''
        }
      }
    })).toEqual({
      ...initialState,
      getLoginSuccess: true,
      user: {
        name: 'potorochinau',
        email: 'potorochinau@ya.ru',
        password: ''
      }
    })
  })
  it('GET_LOGIN_FAILED', () => {
    expect(authReducer(undefined, {
      type: GET_LOGIN_FAILED
    })).toEqual({
      ...initialState,
      getLoginFailed: true,
    })
  })


  it('GET_REGISTER_REQUEST', () => {
    expect(authReducer(undefined, {
      type: GET_REGISTER_REQUEST
    })).toEqual({
      ...initialState,
      getRegisterRequest: true,
    })
  })
  it('GET_REGISTER_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: GET_REGISTER_SUCCESS,
      data: {
        refreshToken: 'very long token',
        accessToken: 'very long token',
        success: true,
        user: {
          name: 'potorochinau',
          email: 'potorochinau@ya.ru',
          password: ''
        }
      }
    })).toEqual({
      ...initialState,
      getRegisterSuccess: true,
      user: {
        name: 'potorochinau',
        email: 'potorochinau@ya.ru',
        password: ''
      }
    })
  })
  it('GET_REGISTER_FAILED', () => {
    expect(authReducer(undefined, {
      type: GET_REGISTER_FAILED
    })).toEqual({
      ...initialState,
      getRegisterFailed: true,
    })
  })


  it('GET_REFRESH_TOKEN_REQUEST', () => {
    expect(authReducer(undefined, {
      type: GET_REFRESH_TOKEN_REQUEST
    })).toEqual({
      ...initialState,
      getRefreshTokenRequest: true,
    })
  })
  it('GET_REFRESH_TOKEN_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: GET_REFRESH_TOKEN_SUCCESS,
      data: {
        refreshToken: 'very long token',
        accessToken: 'very long token',
        success: true,
        user: {
          name: 'potorochinau',
          email: 'potorochinau@ya.ru',
          password: ''
        }
      }
    })).toEqual({
      ...initialState,
      getRefreshTokenSuccess: true,
    })
  })
  it('GET_REFRESH_TOKEN_FAILED', () => {
    expect(authReducer(undefined, {
      type: GET_REFRESH_TOKEN_FAILED
    })).toEqual({
      ...initialState,
      getRefreshTokenFailed: true,
    })
  })


  it('GET_LOGOUT_REQUEST', () => {
    expect(authReducer(undefined, {
      type: GET_LOGOUT_REQUEST
    })).toEqual({
      ...initialState,
      getLogoutRequest: true,
    })
  })
  it('GET_LOGOUT_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: GET_LOGOUT_SUCCESS,
      message: 'Successful logout',
      success: true
    })).toEqual({
      ...initialState,
      getLogoutSuccess: true,
    })
  })
  it('GET_LOGOUT_FAILED', () => {
    expect(authReducer(undefined, {
      type: GET_LOGOUT_FAILED
    })).toEqual({
      ...initialState,
      getLogoutFailed: true,
    })
  })


  it('GET_USER_REQUEST', () => {
    expect(authReducer(undefined, {
      type: GET_USER_REQUEST
    })).toEqual({
      ...initialState,
      getUserRequest: true,
    })
  })
  it('GET_USER_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: GET_USER_SUCCESS,
      data: {
        success: true,
        user: {
          name: 'potorochinau',
          email: 'potorochinau@ya.ru',
          password: ''
        }
      }
    })).toEqual({
      ...initialState,
      getUserSuccess: true,
      user: {
        name: 'potorochinau',
        email: 'potorochinau@ya.ru',
        password: ''
      }
    })
  })
  it('GET_USER_FAILED', () => {
    expect(authReducer(undefined, {
      type: GET_USER_FAILED
    })).toEqual({
      ...initialState,
      getUserFailed: true,
    })
  })



  it('PATCH_USER_REQUEST', () => {
    expect(authReducer(undefined, {
      type: PATCH_USER_REQUEST
    })).toEqual({
      ...initialState,
      patchUserRequest: true,
    })
  })
  it('PATCH_USER_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: PATCH_USER_SUCCESS,
      data: {
        success: true,
        user: {
          name: 'potorochinau',
          email: 'potorochinau@ya.ru',
          password: ''
        }
      }
    })).toEqual({
      ...initialState,
      patchUserSuccess: true,
      user: {
        name: 'potorochinau',
        email: 'potorochinau@ya.ru',
        password: ''
      }
    })
  })
  it('PATCH_USER_FAILED', () => {
    expect(authReducer(undefined, {
      type: PATCH_USER_FAILED
    })).toEqual({
      ...initialState,
      patchUserFailed: true,
    })
  })
});
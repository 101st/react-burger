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

type TUser = {
  email: string,
  name: string,
};

type TData = {
  refreshToken: string,
  accessToken: string,
  success: boolean,
  user: TUser,
};

type TForgotPasswordActions = {
  type: (
    typeof GET_FORGOT_PASSWORD_REQUEST |
    typeof GET_FORGOT_PASSWORD_FAILED
  ),
};

type TForgotPasswordSuccessAction = {
  type: typeof GET_FORGOT_PASSWORD_SUCCESS,
  message: string,
};

type TResetPasswordActions = {
  type: (
    typeof GET_RESET_PASSWORD_REQUEST |
    typeof GET_RESET_PASSWORD_FAILED
  ),
};

type TResetPasswordSuccessAction = {
  type: typeof GET_RESET_PASSWORD_SUCCESS,
  message: string,
};

type TLoginActions = {
  type: (
    typeof GET_LOGIN_REQUEST |
    typeof GET_LOGIN_FAILED
  ),
};

type TLoginSuccessAction = {
  type: typeof GET_LOGIN_SUCCESS,
  data: TData,
};

type TRegisterActions = {
  type: (
    typeof GET_REGISTER_REQUEST |
    typeof GET_REGISTER_FAILED
  ),
};

type TRegisterSuccessAction = {
  type: typeof GET_REGISTER_SUCCESS,
  data: TData
};

type TRefreshActions = {
  type: (
    typeof GET_REFRESH_TOKEN_REQUEST |
    typeof GET_REFRESH_TOKEN_FAILED
  ),
};

type TRefreshSuccessAction = {
  type: typeof GET_REFRESH_TOKEN_SUCCESS,
  data: TData,
};

type TLogoutActions = {
  type: (
    typeof GET_LOGOUT_REQUEST |
    typeof GET_LOGOUT_FAILED
  ),
};

type TLogoutSuccessAction = {
  type: typeof GET_LOGOUT_SUCCESS,
  message: string,
};

type TUserActions = {
  type: (
    typeof GET_USER_REQUEST |
    typeof GET_USER_FAILED
  ),
};

type TUserSuccessAction = {
  type: typeof GET_USER_SUCCESS,
  data: TData,
  message: string,
};

type TPatchUserActions = {
  type: (
    typeof PATCH_USER_REQUEST |
    typeof PATCH_USER_FAILED
  ),
};

type TPatchUserSuccessAction = {
  type: typeof PATCH_USER_SUCCESS,
  data: TData,
  message: string,
};

export type TAuthActions = (
  TForgotPasswordActions |
  TForgotPasswordSuccessAction |
  TResetPasswordActions |
  TResetPasswordSuccessAction |
  TLoginActions |
  TLoginSuccessAction |
  TRegisterActions |
  TRegisterSuccessAction |
  TRefreshActions |
  TRefreshSuccessAction |
  TLogoutActions |
  TLogoutSuccessAction |
  TUserActions |
  TUserSuccessAction |
  TPatchUserActions |
  TPatchUserSuccessAction
);
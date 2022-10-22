import {
  GET_FORGOT_PASSWORD_REQUEST,
  GET_FORGOT_PASSWORD_SUCCESS,
  GET_FORGOT_PASSWORD_FAILED,
  GET_RESET_PASSWORD_REQUEST,
  GET_RESET_PASSWORD_SUCCESS,
  GET_RESET_PASSWORD_FAILED,
} from "../actions/auth";

const initialState = {
  getForgotPasswordResponseMessage: false,
  getForgotPasswordRequest: false,
  getForgotPasswordFailed: false,

  getResetPasswordResponseMessage: false,
  getResetPasswordRequest: false,
  getResetPasswordFailed: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default: {
      return state;
    }
  }
};
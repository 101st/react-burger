import {
  GET_FORGOT_PASSWORD_REQUEST,
  GET_FORGOT_PASSWORD_SUCCESS,
  GET_FORGOT_PASSWORD_FAILED,
} from "../actions/auth";

const initialState = {
  getForgotPasswordResponseMessage: false,
  getForgotPasswordRequest: false,
  getForgotPasswordFailed: false,
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
    default: {
      return state;
    }
  }
};
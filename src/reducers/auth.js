import { LOGIN, LOGOUT, LOG_ERROR } from '../constants';
import { getAvtorizetion } from '../selectors';

const initialState = {
  user: null,
  errorMsg: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: {
          mail: action.payload.mail
        },
        errorMsg: '',
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
        errorMsg: '',
      }
    case LOG_ERROR:
      return {
        ...state,
        errorMsg: action.payload.errorMsg,
      }
    default:
      return state
  }
}
import { loginHandler } from '../selectors';
import { LOGIN, LOGOUT, LOG_ERROR } from '../constants';

export function logIn(params) {
  return (dispatch) => {
    if (loginHandler(params)) {
      dispatch({
        type: LOGIN,
        payload: {
          mail: params.mail
        },
      });localStorage.setItem('session', params);
    } else {
      dispatch({
        type: LOG_ERROR,
        payload: {
          errorMsg: 'Имя пользователя или пароль введены не верно!',
        },
        error: true,
      })
    }
  }
}

export function logOut() {
  return {
    type: LOGOUT,
  }
}
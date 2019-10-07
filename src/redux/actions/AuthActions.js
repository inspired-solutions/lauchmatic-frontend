import Types from "../types/AuthTypes";
import AuthService from "../../services/auth.service";

const AuthActions = {
  login: (username, password) => async dispatch => {
    try {
      const response = await AuthService.login(username, password);
      const { status, data } = response;

      if (status === 200) {
        dispatch({ type: Types.LOGIN_SUCCESS, payload: data });
      } else {
        dispatch({ type: Types.LOGIN_ERROR, payload: data });
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  },
  logout: () => {
    localStorage.clear();
    window.location.reload()
    localStorage.removeItem('auth');

    return { type: Types.LOGOUT };
  }
};

export default AuthActions;

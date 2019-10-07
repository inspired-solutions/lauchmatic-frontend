import Types from '../types/AuthTypes';
const initialState = {
  id: 0,
  is_superuser: false,
  fullName: '',
  avatar: '',
  token: ''
};

export default (state = initialState, action) => {
  switch (action.type) {

    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case Types.LOGIN_ERROR:
      return {
        ...state
      };

    case Types.REFRESH_TOKEN:
      return {
        ...state,
        ...action.payload
      };


    case Types.LOGOUT:
      return {
        ...state,
        ...initialState
      };

    default:
      return state;
  }
};
import AdminTextsTypes from '../../redux/types/AdminTextTypes'

const initialState = {
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AdminTextsTypes.ADMIN_ADD_TEXT:
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    case AdminTextsTypes.ADMIN_UPDATE_TEXT:
      return {
        ...state,
        list: state.list.map(text =>
          text.id === action.payload.id ? { ...text, ...action.payload } : text
        )
      };
    case AdminTextsTypes.ADMIN_DELETE_TEXT:
      return {
        ...state,
        list: state.list.filter(text => text.id !== action.payload.id)
      };
    case AdminTextsTypes.ADMIN_RESET_TEXTS:
      return {
        ...state,
        list: []
      };

    default:
      return state;
  }
};

import TextTypes from '../types/TextTypes'

const initialState = {
  selectedText: null,
  isDraggable: false,
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TextTypes.SET_EDITING_TEXT:
      return {
        ...state,
        selectedText: action.payload
      };
    case TextTypes.SET_DRAGGABLE:
      return {
        ...state,
        isDraggable: action.payload
      };
    case TextTypes.ADD_TEXT:
      return {
        ...state,
        list: [...state.list, action.payload]
      };

    case TextTypes.UPDATE_TEXT:
      return {
        ...state,
        list: state.list.map(text =>
          text.id === action.payload.id ? { ...text, ...action.payload } : text
        )
      };
    case TextTypes.DELETE_TEXT:
      return {
        ...state,
        list: state.list.filter(text => text.id !== action.payload.id)
      };
    case TextTypes.RESET_TEXTS_STATE:
      return initialState;
    case TextTypes.LOAD_TEXTS:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
};

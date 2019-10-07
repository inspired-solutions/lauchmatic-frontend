import { COLOR_FILL_TYPE, GRADIENT_COLOR_SELECTED } from '../../common/constants/BackgroundConstant'
import BackgroundTypes from '../types/BackgroundTypes'

const initialState = {
  list: [],

  gradientColorSelected: GRADIENT_COLOR_SELECTED.START,

  type: COLOR_FILL_TYPE.SOLID_FILL_ONE_COLOR,

  background: {
    id: 0,
    value: {
      hex: "",
      opacity: "",
      gradient: "",
      imageUrl: ""
    }
  },
  gradientColorStart: {
    id: 0,
    value: {
      hex: "",
      opacity: ""
    }
  },
  gradientColorEnd: {
    id: 0,
    value: {
      hex: "",
      opacity: ""
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BackgroundTypes.GET_ALL:
      return {
        ...state,
        list: action.payload
      };

    case BackgroundTypes.SET_BACKGROUND:
      return {
        ...state,
        background: action.payload
      };

    case BackgroundTypes.SET_GRADIENT_COLOR_START:
      return {
        ...state,
        gradientColorStart: action.payload
      };

    case BackgroundTypes.SET_GRADIENT_COLOR_END:
      return {
        ...state,
        gradientColorEnd: action.payload
      };

    case BackgroundTypes.SET_BACKGROUND_TYPE:
      return {
        ...state,
        type: action.payload
      };

    case BackgroundTypes.SET_GRADIENT_COLOR_SELECTED:
      return {
        ...state,
        gradientColorSelected: action.payload
      };

    case BackgroundTypes.RESET_BACKGROUND_STATE:
      return initialState;

    default:
      return state;
  }
};

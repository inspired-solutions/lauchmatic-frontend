import ScreensTypes from '../types/ScreensTypes'

const initialState = {
  listScreensMenu: [],
  listScreensCanvas: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ScreensTypes.ADD_SCREEN_MENU:
      return {
        ...state,
        listScreensMenu: [...state.listScreensMenu, action.payload],
      }

    case ScreensTypes.REMOVE_SCREEN:
      return {
        ...state,
        listScreensMenu: state.listScreensMenu.filter(screen => screen.id === action.payload.id),
      }

    case ScreensTypes.ADD_SCREEN_CANVAS:
      return {
        ...state,
        listScreensCanvas: [...state.listScreensCanvas, action.payload],
      }

    case ScreensTypes.REMOVE_SCREEN_CANVAS:
      return {
        ...state,
        listScreensCanvas: state.listScreensCanvas.filter(
          screen => screen.id === action.payload.id
        ),
      }

    case ScreensTypes.RESET_SCREENS_STATE:
      return initialState

    default:
      return state
  }
}

import ScreensTypes from '../../redux/types/ScreensTypes'
import uuid from 'uuid/v1'

const ScreensActions = {
  addScreenMenu: screen => ({
    type: ScreensTypes.ADD_SCREEN_MENU,
    payload: { id: uuid(), ...screen },
  }),

  removeScreenMenu: screen => ({ type: ScreensTypes.REMOVE_SCREEN, payload: screen }),

  addScreenCanvas: screen => ({ type: ScreensTypes.ADD_SCREEN_CANVAS, payload: screen }),

  removeScreenCanvas: screen => ({ type: ScreensTypes.REMOVE_SCREEN_CANVAS, payload: screen }),

  resetScreensState: () => ({ type: ScreensTypes.RESET_SCREENS_STATE }),
}
export default ScreensActions

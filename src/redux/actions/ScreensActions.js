import ScreensTypes from "../types/ScreensTypes";
import uuid from "uuid/v1";
import screenService from "../../services/screen.service";

const ScreensActions = {
  addScreenMenu: screen => ({
    type: ScreensTypes.ADD_SCREEN_MENU,
    payload: { id: uuid(), ...screen }
  }),

  removeScreenMenu: screen => ({
    type: ScreensTypes.REMOVE_SCREEN,
    payload: screen
  }),

  addScreenCanvas: screen => async dispatch => {
    try {
      await screenService.addScreen(screen);
    } catch (error) {
      console.log(error);
    }
  },

  removeScreenCanvas: screen => ({
    type: ScreensTypes.REMOVE_SCREEN_CANVAS,
    payload: screen
  }),

  resetScreensState: () => ({ type: ScreensTypes.RESET_SCREENS_STATE })
};
export default ScreensActions;

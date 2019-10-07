import { SELECTED_MODULE } from '../../common/constants/SelectedModuleConstant'
import AdminAppTypes from '../../redux/types/AdminAppTypes'
import { SCREENS_TYPE } from '../../common/constants/ScreensConstant'

const initialState = {
  selectedModule: SELECTED_MODULE.TEMPLATES,
  seletedDevice: null,
  deviceThumbnail: '',
  screenType: SCREENS_TYPE[0].value,
  selectedText: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AdminAppTypes.ADMIN_SET_SELECTED_MODULE:
      return {
        ...state,
        selectedModule: action.payload,
      }
    case AdminAppTypes.ADMIN_SET_SCREEN_TYPE:
      return {
        ...state,
        screenType: action.payload,
      }
    case AdminAppTypes.ADMIN_SET_DEVICE_THUMBNAIL:
      return {
        ...state,
        deviceThumbnail: action.payload,
      }
    case AdminAppTypes.ADMIN_SET_SELECTED_DEVICE:
      return {
        ...state,
        seletedDevice: action.payload,
      }
    case AdminAppTypes.ADMIN_SET_SELECTED_TEXT:
      return {
        ...state,
        selectedText: action.payload,
      }

    default:
      return state
  }
}

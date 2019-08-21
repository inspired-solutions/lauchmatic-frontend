import { SELECTED_MODULE } from '@common/constants/SelectedModuleConstant'
import AppTypes from '../types/AppTypes'

const initialState = {
  loading: false,
  selectedModule: SELECTED_MODULE.NONE,
  currentDesign: null,
  currentTemplate: null,

  menuMessage: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AppTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      }

    case AppTypes.SET_SELECTED_MODULE:
      return {
        ...state,
        selectedModule: action.payload,
      }

    case AppTypes.SET_CURRENT_DESIGN:
      return {
        ...state,
        currentDesign: action.payload,
      }
    case AppTypes.SET_CURRENT_TEMPLATE:
      return {
        ...state,
        currentTemplate: action.payload,
      }
    case AppTypes.SET_MENU_MESSAGE:
      return {
        ...state,
        menuMessage: action.payload,
      }

    default:
      return state
  }
}

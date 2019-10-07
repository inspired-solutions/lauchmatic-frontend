import AdminTemplateTypes from '../../redux/types/AdminTemplatesTypes'

const initialState = {
  templatesOneScreen: [],
  templatesTwoScreen: [],
  templatesThreeScreen: [],
  template: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AdminTemplateTypes.ADMIN_LOAD_TEMPLATES_ONE_SCREEN:
      return {
        ...state,
        templatesOneScreen: action.payload,
      }
    case AdminTemplateTypes.ADMIN_ADD_TEMPLATES_ONE_SCREEN:
      return {
        ...state,
        templatesOneScreen: [...state.templatesOneScreen, action.payload],
      }
    case AdminTemplateTypes.ADMIN_LOAD_TEMPLATES_TWO_SCREEN:
      return {
        ...state,
        templatesTwoScreen: action.payload,
      }
    case AdminTemplateTypes.ADMIN_ADD_TEMPLATES_TWO_SCREEN:
      return {
        ...state,
        templatesTwoScreen: [...state.templatesTwoScreen, action.payload],
      }
    case AdminTemplateTypes.ADMIN_LOAD_TEMPLATES_THREE_SCREEN:
      return {
        ...state,
        templatesThreeScreen: action.payload,
      }
    case AdminTemplateTypes.ADMIN_ADD_TEMPLATES_THREE_SCREEN:
      return {
        ...state,
        templatesThreeScreen: [...state.templatesThreeScreen, action.payload],
      }
    case AdminTemplateTypes.ADMIN__SET_TEMPLATE:
      return {
        ...state,
        template: action.payload,
      }

    default:
      return state
  }
}

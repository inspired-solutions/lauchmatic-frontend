import TemplateTypes from '../types/TemplateTypes'

const initialState = {
  templatesOneScreen: [],
  templatesTwoScreen: [],
  templatesThreeScreen: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TemplateTypes.LOAD_TEMPLATES_ONE_SCREEN:
      return {
        ...state,
        templatesOneScreen: action.payload,
      }
    case TemplateTypes.LOAD_TEMPLATES_TWO_SCREEN:
      return {
        ...state,
        templatesTwoScreen: action.payload,
      }
    case TemplateTypes.LOAD_TEMPLATES_THREE_SCREEN:
      return {
        ...state,
        templatesThreeScreen: action.payload,
      }

    default:
      return state
  }
}

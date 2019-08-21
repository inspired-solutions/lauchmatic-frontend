import TemplateTypes from '@redux/types/TemplateTypes'

const TemplateAction = {
  loadTemplateOneScreen: templates => ({
    type: TemplateTypes.LOAD_TEMPLATES_ONE_SCREEN,
    payload: templates,
  }),

  loadTemplateTwoScreen: templates => ({
    type: TemplateTypes.LOAD_TEMPLATES_TWO_SCREEN,
    payload: templates,
  }),

  loadTemplateThreeScreen: templates => ({
    type: TemplateTypes.LOAD_TEMPLATES_THREE_SCREEN,
    payload: templates,
  }),
}

export default TemplateAction

/* eslint no-param-reassign: 0 */ //
/* eslint no-return-assign: 0 */ //
/* eslint no-case-declarations: 0 */ //

import TemplateTypes from '../types/TemplateTypes'
import produce from 'immer'

const templateScreenQuantity = {
  1: "templatesOneScreen",
  2: "templatesTwoScreen",
  3: "templatesThreeScreen"
};

const initialState = {
  templatesOneScreen: [],
  templatesTwoScreen: [],
  templatesThreeScreen: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TemplateTypes.LOAD_TEMPLATES_ONE_SCREEN:
      return {
        ...state,
        templatesOneScreen: action.payload
      };
    case TemplateTypes.LOAD_TEMPLATES_TWO_SCREEN:
      return {
        ...state,
        templatesTwoScreen: action.payload
      };
    case TemplateTypes.LOAD_TEMPLATES_THREE_SCREEN:
      return {
        ...state,
        templatesThreeScreen: action.payload
      };
    case TemplateTypes.UPDATE_TEXT_TEMPLATE:
      // payload  {
      //   template: {
      //     screen_quantity,
      //     id,
      //   },
      //   text: {
      //     ....
      //   }
      // }
      console.log("entro");

      return produce(state, draft => {
        console.log("entro a produce");
        const draftTemplateIds = state[
          templateScreenQuantity[action.payload.template.screen_quantity]
        ].map(template => template.id);

        const indexTemplate = draftTemplateIds.indexOf(
          action.payload.template.id
        );
        console.log(indexTemplate);
        if (indexTemplate === -1) {
          return;
        }
        console.log("paso primer index template");
        const indeOfText = state[
          templateScreenQuantity[action.payload.template.screen_quantity]
        ][indexTemplate].texts_list
          .map(text => text.id)
          .indexOf(action.payload.text.id);
        if (indeOfText === -1) {
          return;
        }
        console.log("paso primer index of text");
        draft[templateScreenQuantity[action.payload.template.screen_quantity]][
          indexTemplate
        ].texts_list[indeOfText] = {
          ...draft[
            templateScreenQuantity[action.payload.template.screen_quantity]
          ][indexTemplate].texts_list[indeOfText],
          ...action.payload.text
        };
      });

    case TemplateTypes.UPDATE_BACKGROUND_TEMPLATE:
      // payload  {
      //   template: {
      //     screen_quantity,
      //     id,
      //   },
      //   background: {
      //     ....
      //   }
      // }
      console.log("entro");
      return produce(state, draft => {
        console.log("entro a produce");
        const draftTemplateIds = state[
          templateScreenQuantity[action.payload.template.screen_quantity]
        ].map(template => template.id);

        const indexTemplate = draftTemplateIds.indexOf(
          action.payload.template.id
        );
        console.log(indexTemplate);
        if (indexTemplate === -1) {
          return;
        }
        console.log("paso primer index of text");
        draft[templateScreenQuantity[action.payload.template.screen_quantity]][
          indexTemplate
        ].background_color = action.payload.background;
      });

    default:
      return state;
  }
};

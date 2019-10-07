import TemplateTypes from "../types/TemplateTypes";
import templateService from "../../services/template.service";
import AppTypes from "../types/AppTypes";
import TextTypes from "../types/TextTypes";
import { COLOR_FILL_TYPE } from "../../common/constants/BackgroundConstant";
import configureStore from "../../redux/store";
const { store } = configureStore();

const TemplateAction = {
  loadTemplateOneScreen: templates => ({
    type: TemplateTypes.LOAD_TEMPLATES_ONE_SCREEN,
    payload: templates
  }),

  loadTemplateTwoScreen: templates => ({
    type: TemplateTypes.LOAD_TEMPLATES_TWO_SCREEN,
    payload: templates
  }),

  loadTemplateThreeScreen: templates => ({
    type: TemplateTypes.LOAD_TEMPLATES_THREE_SCREEN,
    payload: templates
  }),

  addTemplate: template => async dispatch => {
    try {
      dispatch({ type: AppTypes.SET_SAVING, payload: true });
      await templateService.addTemplate(template);
      dispatch({ type: AppTypes.SET_SAVING, payload: false });
    } catch (error) {
      console.log(error);
    }
  },

  getCustomerTemplates: () => async dispatch => {
    try {
      const userId = store.getState().auth.id;

      const response = await templateService.getCustomerTemplates(userId);
      const templates = response.map(template => ({
        ...template,
        devices: template.devices.map(device => ({
          ...device,
          image: `${process.env.REACT_APP_NEXT_PUBLIC_API}${device.image}`,
          left: Number(device.left),
          right: Number(device.right),
          rotation: Number(device.rotation),
          scaleX: Number(device.scaleX),
          scaleY: Number(device.scaleY),
          skewX: Number(device.skewX),
          skewY: Number(device.skewY),
          top: Number(device.top),
          width: Number(device.width),
          height: Number(device.height),
          x: Number(device.x),
          y: Number(device.y)
        })),
        texts_list: template.texts_list.map(text => ({
          ...text,
          left: Number(text.left),
          right: Number(text.right),
          rotation: Number(text.rotation),
          scaleX: Number(text.scaleX),
          scaleY: Number(text.scaleY),
          skewX: Number(text.skewX),
          skewY: Number(text.skewY),
          top: Number(text.top),
          width: Number(text.width),
          height: Number(text.height),
          x: Number(text.x),
          y: Number(text.y),
          font_size: Number(text.font_size),
          font_style: Number(text.font_style),
          text_align: Number(text.text_align),
          color: (() => {
            try {
              if (!text.color) {
                throw new Error("No hay color en text #" + text.id);
              }
              return JSON.parse(text.color);
            } catch (error) {
              console.log(error);
              return {
                hex: "#000000",
                opacity: 100
              };
            }
          })()
        })),
        images_list: template.images_list.map(image => ({
          ...image,
          left: Number(image.left),
          right: Number(image.right),
          rotation: Number(image.rotation),
          scaleX: Number(image.scaleX),
          scaleY: Number(image.scaleY),
          skewX: Number(image.skewX),
          skewY: Number(image.skewY),
          top: Number(image.top),
          width: Number(image.width),
          height: Number(image.height),
          x: Number(image.x),
          y: Number(image.y),
          font_size: Number(image.font_size),
          font_style: Number(image.font_style),
          image_align: Number(image.text_align)
        })),
        // background_color: ()=>{return JSON.parse(template.background_color)}(),
        background_color: (() => {
          try {
            if (!template.background_color) {
              throw new Error(
                "Template " + template.id + "background_color es nulo"
              );
            }
            return JSON.parse(template.background_color);
          } catch (error) {
            return {
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
          }
        })()
      }));

      const texts = templates
        .filter(template => !!template.screen_quantity)
        .map(template => template.texts_list)
        .flat();
      const templatesOneScreen = templates.filter(
        template => template.screen_quantity === 1
      );
      const templatesTwoScreen = templates.filter(
        template => template.screen_quantity === 2
      );
      const templatesThreeScreen = templates.filter(
        template => template.screen_quantity === 3
      );

      dispatch({
        type: TemplateTypes.LOAD_TEMPLATES_ONE_SCREEN,
        payload: templatesOneScreen
      });
      dispatch({
        type: TemplateTypes.LOAD_TEMPLATES_TWO_SCREEN,
        payload: templatesTwoScreen
      });
      dispatch({
        type: TemplateTypes.LOAD_TEMPLATES_THREE_SCREEN,
        payload: templatesThreeScreen
      });
      dispatch({
        type: TextTypes.LOAD_TEXTS,
        payload: texts
      });
    } catch (error) {
      console.log(error);
    }
  },
  /**only must is this in future */
  updateTextTemplate: (template, text) => async dispatch => {
    dispatch({
      type: TemplateTypes.UPDATE_TEXT_TEMPLATE,
      payload: { template, text }
    });

    dispatch({
      type: TextTypes.UPDATE_TEXT,
      payload: text
    });
  },
  deleteCustomerTemplate: templateId => async () => {
    try {
      return await templateService.deleteTemplate(templateId);
    } catch (error) {
      return error.response;
    }
  },
  updateTemplate: template => async () => {
    try {
      return await templateService.updateTemplate(template);
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },
  updateBackgroundTemplate: (template, background) => ({
    type: TemplateTypes.UPDATE_BACKGROUND_TEMPLATE,
    payload: {
      template,
      background
    }
  })
};

export default TemplateAction;

import AdminTemplateTypes from "../types/AdminTemplatesTypes";
import templateService from "../../template.service";
import textService from "../../text.service";

const AdminTemplateAction = {
  getAdminTemplates: () => async dispatch => {
    // tryca
    try {
      const response = await templateService.getAdminTemplates();
      const templates = response.map(template => ({
        ...template,
        devices: template.devices.map(device => ({
          ...device,
          image: `${process.env.NEXT_PUBLIC_API}${device.image}`,
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
          y: Number(text.y)
        }))
      }));

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
        type: AdminTemplateTypes.ADMIN_LOAD_TEMPLATES_ONE_SCREEN,
        payload: templatesOneScreen
      });
      dispatch({
        type: AdminTemplateTypes.ADMIN_LOAD_TEMPLATES_TWO_SCREEN,
        payload: templatesTwoScreen
      });
      dispatch({
        type: AdminTemplateTypes.ADMIN_LOAD_TEMPLATES_THREE_SCREEN,
        payload: templatesThreeScreen
      });
    } catch (error) {
      console.log(error);
    }
  },

  addTemplate: (template, devices, texts) => async dispatch => {
    /**because use uuid() for set id before dave in firestore and after not is necesary */
    try {
      const { id: templateId } = await templateService.addTemplate({
        ...template
      });
      await Promise.all([
        ...devices.map(device =>
          templateService.addTemplateDevice(templateId, device)
        ),
        ...texts.map(text =>
          textService.addText({ ...text, template: templateId })
        )
      ]);
    } catch (error) {
      console.log(error);
    }
  },

  setTemplate: template => ({
    type: AdminTemplateTypes.ADMIN__SET_TEMPLATE,
    payload: template
  })
};

export default AdminTemplateAction;

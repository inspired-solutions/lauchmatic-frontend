import TextTypes from "../types/TextTypes";
import ImagesTypes from "../types/ImagesTypes";
import textService from "../../services/text.service";

const TextActions = {
  addText: text => async dispatch => {
    try {
      const { id } = await textService.addText(text);
      dispatch({
        type: TextTypes.SET_EDITING_TEXT,
        payload: id
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateText: text => async dispatch => {
    try {
      await textService.updateText(text);
    } catch (error) {
      console.log(error);
    }
  },

  deleteText: text => async dispatch => {
    try {
      await textService.deleteText(text);
    } catch (error) {
      console.log(error);
    }
  },

  setSelectedText: text => async dispatch => {
    dispatch({
      type: ImagesTypes.SET_IMAGE_CANVAS_SELECTED,
      payload: null
    });
    dispatch({
      type: TextTypes.SET_EDITING_TEXT,
      payload: text
    });
  },

  setDraggable: draggable => ({
    type: TextTypes.SET_DRAGGABLE,
    payload: draggable
  }),

  resetTextState: () => ({
    type: TextTypes.RESET_TEXTS_STATE
  }),
  loadTexts: texts => ({
    type: TextTypes.LOAD_TEXTS,
    payload: texts
  })
};

export default TextActions;

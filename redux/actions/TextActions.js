import TextTypes from '../types/TextTypes'
import uuid from 'uuid/v1'
import ImagesTypes from '@redux/types/ImagesTypes'

const TextActions = {
  addText: text => async dispatch => {
    const id = uuid()
    dispatch({
      type: TextTypes.ADD_TEXT,
      payload: { ...text, id },
    })
    dispatch({
      type: TextTypes.SET_EDITING_TEXT,
      payload: id,
    })
  },

  updateText: text => ({
    type: TextTypes.UPDATE_TEXT,
    payload: text,
  }),

  deleteText: text => ({
    type: TextTypes.DELETE_TEXT,
    payload: text,
  }),

  setSelectedText: text => async dispatch => {
    dispatch({
      type: ImagesTypes.SET_IMAGE_CANVAS_SELECTED,
      payload: null,
    })
    dispatch({
      type: TextTypes.SET_EDITING_TEXT,
      payload: text,
    })
  },

  setDraggable: draggable => ({
    type: TextTypes.SET_DRAGGABLE,
    payload: draggable,
  }),

  resetTextState: () => ({
    type: TextTypes.RESET_TEXTS_STATE,
  }),
}

export default TextActions

import ImagesTypes from '@redux/types/ImagesTypes'
import uuid from 'uuid/v1'
import TextTypes from '@redux/types/TextTypes'

const ImagesActions = {
  addImageMenu: image => ({
    type: ImagesTypes.ADD_IMAGE_MENU,
    payload: {
      id: uuid(),
      ...image,
    },
  }),

  removeImageMenu: image => ({
    type: ImagesTypes.REMOVE_IMAGE_MENU,
    payload: image,
  }),

  addImageCanvas: image => async dispatch => {
    dispatch({ type: ImagesTypes.REMOVE_IMAGE_MENU, payload: image })
    dispatch({ type: ImagesTypes.ADD_IMAGE_CANVAS, payload: image })
  },
  removeImageCanvas: image => ({
    type: ImagesTypes.REMOVE_IMAGE_CANVAS,
    payload: image,
  }),

  updateImageCanvas: image => ({
    type: ImagesTypes.UPDATE_IMAGE_CANVAS,
    payload: image,
  }),

  setImageCanvasSelected: image => async dispatch => {
    dispatch({
      type: TextTypes.SET_EDITING_TEXT,
      payload: null,
    })
    dispatch({
      type: ImagesTypes.SET_IMAGE_CANVAS_SELECTED,
      payload: image,
    })
  },

  resetImagesState: () => ({
    type: ImagesTypes.RESET_IMAGES_STATE,
  }),
}

export default ImagesActions

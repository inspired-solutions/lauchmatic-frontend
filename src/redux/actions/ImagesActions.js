import ImagesTypes from '../../redux/types/ImagesTypes'
import uuid from 'uuid/v1'
import TextTypes from '../../redux/types/TextTypes'
import imageService from '../../services/image.service'

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
    try {
      await imageService.addImage(image)
    } catch (error) {
      console.log(error)
    }
    dispatch({ type: ImagesTypes.REMOVE_IMAGE_MENU, payload: image })

    // dispatch({ type: ImagesTypes.ADD_IMAGE_CANVAS, payload: image })
  },
  removeImageCanvas: image => async dispatch =>{
    try {
      await imageService.deleteImage(image)
    } catch (error) {
      console.log(error)
    }
  },

  updateImageCanvas: image => async dispatch => {
    try {
      await imageService.updateImage(image)
    } catch (error) {
      console.log(error)
    }
  },


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

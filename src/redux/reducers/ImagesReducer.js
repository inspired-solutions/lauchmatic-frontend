import ImagesTypes from '../types/ImagesTypes'

const initialState = {
  listImagesMenu: [],
  listImagesCanvas: [],
  imageCanvasSelected: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ImagesTypes.ADD_IMAGE_MENU:
      return {
        ...state,
        listImagesMenu: [...state.listImagesMenu, action.payload],
      }
    case ImagesTypes.REMOVE_IMAGE_MENU:
      return {
        ...state,
        listImagesMenu: state.listImagesMenu.filter(image => image.id !== action.payload.id),
      }
    case ImagesTypes.ADD_IMAGE_CANVAS:
      return {
        ...state,
        listImagesCanvas: [...state.listImagesCanvas, action.payload],
      }
    case ImagesTypes.UPDATE_IMAGE_CANVAS:
      return {
        ...state,
        listImagesCanvas: state.listImagesCanvas.map(image =>
          image.id === action.payload.id ? { ...image, ...action.payload } : image
        ),
      }
    case ImagesTypes.REMOVE_IMAGE_CANVAS:
      return {
        ...state,
        listImagesCanvas: state.listImagesCanvas.filter(image => image.id !== action.payload.id),
      }
    case ImagesTypes.SET_IMAGE_CANVAS_SELECTED:
      return {
        ...state,
        imageCanvasSelected: action.payload,
      }
    case ImagesTypes.RESET_IMAGES_STATE:
      return initialState
    default:
      return state
  }
}

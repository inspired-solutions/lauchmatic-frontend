import AdminDeviceThumbnailTypes from '../../redux/types/AdminDeviceThumbnailTypes'

const initialState = {
  list: [],
  device: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AdminDeviceThumbnailTypes.ADMIN_ADD_DEVICE_THUMBNAIL:
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    case AdminDeviceThumbnailTypes.ADMIN_GET_DEVICE_THUMBNAILS:
      return {
        ...state,
        list: action.payload
      };
    case AdminDeviceThumbnailTypes.SET_DEVICE:
      return {
        ...state,
        device: action.payload
      };

    default:
      return state;
  }
};

import AdminDevicesTypes from '../../redux/types/AdminDevicesTypes'

const initialState = {
  listDevices: [],
  listDevicesCanvas: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AdminDevicesTypes.ADMIN_LOAD_DEVICES:
      return {
        ...state,
        listDevices: action.payload,
      }
    case AdminDevicesTypes.ADMIN_ADD_DEVICES:
      return {
        ...state,
        listDevices: [...state.listDevices, action.payload],
      }

    case AdminDevicesTypes.ADMIN_ADD_DEVICES_CANVAS:
      return {
        ...state,
        listDevicesCanvas: [...state.listDevicesCanvas, action.payload],
      }

    case AdminDevicesTypes.ADMIN_UPDATE_DEVICE_CANVAS:
      return {
        ...state,
        listDevicesCanvas: state.listDevicesCanvas.map(image =>
          image.id === action.payload.id ? { ...image, ...action.payload } : image
        ),
      }
    case AdminDevicesTypes.ADMIN_RESET_DEVICES_CANVAS:
      return {
        ...state,
        listDevicesCanvas: [],
      }
    default:
      return state
  }
}

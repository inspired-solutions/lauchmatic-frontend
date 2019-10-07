import AdminDeviceThumbnailTypes from "../types/AdminDeviceThumbnailTypes";
import deviceThumbnailService from "../../deviceThumbnail.service";

////////////////////////////////////////////////////////////////////////////////////////////////////

const AdminDeviceThumbnailAction = {
  addDeviceThumbnail: device => async dispatch => {
    try {
      const response = await deviceThumbnailService.addDeviceThumbnail(device);
      dispatch({
        type: AdminDeviceThumbnailTypes.ADMIN_ADD_DEVICE_THUMBNAIL,
        payload: response
      });
    } catch (error) {
      console.log(error);
    }
  },

  getDeviceThumbnails: () => async dispatch => {
    try {
      const response = await deviceThumbnailService.getDeviceThumbnails();
      dispatch({
        type: AdminDeviceThumbnailTypes.ADMIN_GET_DEVICE_THUMBNAILS,
        payload: response
      });
    } catch (error) {
      console.log(error);
    }
  },

  setDeviceThumbnail: device => ({
    type: AdminDeviceThumbnailTypes.ADMIN_SET_DEVICE,
    payload: device
  })
};

export default AdminDeviceThumbnailAction;

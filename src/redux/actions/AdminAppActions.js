import AdminAppTypes from "../types/AdminAppTypes";

const AdminAppAction = {
  setSelectedModule: selectedModule => ({
    type: AdminAppTypes.ADMIN_SET_SELECTED_MODULE,
    payload: selectedModule
  }),
  setDeviceThumbnail: deviceThumbnail => ({
    type: AdminAppTypes.ADMIN_SET_DEVICE_THUMBNAIL,
    payload: deviceThumbnail
  }),
  setScreenType: screenType => ({
    type: AdminAppTypes.ADMIN_SET_SCREEN_TYPE,
    payload: screenType
  }),
  setSelectedDevice: device => ({
    type: AdminAppTypes.ADMIN_SET_SELECTED_DEVICE,
    payload: device
  }),
  setSelectedText: device => ({
    type: AdminAppTypes.ADMIN_SET_SELECTED_TEXT,
    payload: device
  })
};

export default AdminAppAction;

import AdminDevicesTypes from "../types/AdminDevicesTypes";
import uuid from "uuid/v1";
////////////////////////////////////////////////////////////////////////////////////////////////////

const AdminDevicesAction = {
  loadDevices: devices => ({
    type: AdminDevicesTypes.ADMIN_LOAD_DEVICES,
    payload: devices
  }),

  addDevices: device => ({
    type: AdminDevicesTypes.ADMIN_ADD_DEVICES,
    payload: { id: uuid(), ...device }
  }),

  addDevicesCanvas: device => ({
    type: AdminDevicesTypes.ADMIN_ADD_DEVICES_CANVAS,
    payload: { ...device, id: uuid() }
  }),

  updateDeviceCanvas: device => ({
    type: AdminDevicesTypes.ADMIN_UPDATE_DEVICE_CANVAS,
    payload: device
  }),
  resetDevicesCanvas: () => ({
    type: AdminDevicesTypes.ADMIN_RESET_DEVICES_CANVAS
  })
};

export default AdminDevicesAction;

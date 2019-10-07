import api from "./api";

function addThumbnailDevice(device) {
  return api
    .post("/devices", device, {
      headers: {
       "Content-Type": "multipart/form-data" 
      }
    })
    .then(({ data }) => data);
}

function getThumbnailDevices(device) {
  return api.get("/devices", device).then(({ data }) => data);
}

export default {
  addThumbnailDevice,
  getThumbnailDevices
};

import api from "./api";

function addDeviceThumbnail(thumbnailDevice) {
  return api
    .post("/api/v1/thumbnails/", thumbnailDevice, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(({ data }) => data);
}

function getDeviceThumbnails() {
  return api
    .get("/api/v1/thumbnails")
    .then(({ data }) => data);
}

export default {
  addDeviceThumbnail,
  getDeviceThumbnails
};

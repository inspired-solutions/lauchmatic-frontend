import api from "./api";

function addImage(image) {
  const formData = new FormData();
  Object.keys(image).forEach(key =>
    key === "image"
      ? formData.append(
          key,
          image[key],
          image.id + "." + image.url.split(";")[0].split("/")[1]
        )
      : formData.append(key, image[key])
  );
  return api
    .post("/api/v1/images/", formData, {
      headers: {
        Authorization: `JWT ${localStorage && localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data"
      }
    })
    .then(({ data }) => data);
}

function updateImage(image) {
  return api
    .patch(`/api/v1/images/${image.id}/`, image, {
      headers: {
        Authorization: `JWT ${localStorage && localStorage.getItem("token")}`
      }
    })
    .then(({ data }) => data);
}
function deleteImage(image) {
  return api
    .delete(`/api/v1/images/${image.id}/`, {
      headers: {
        Authorization: `JWT ${localStorage && localStorage.getItem("token")}`
      }
    })
    .then(({ data }) => data);
}
export default {
  addImage,
  updateImage,
  deleteImage
};

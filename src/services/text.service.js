import api from "./api";

function addText(text) {
  return api.post("/api/v1/texts/", text).then(({ data }) => data);
}

function updateText(text) {
  /**why, for fix fast */
  const { token } = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).auth
  );
  return api
    .patch(`/api/v1/texts/${text.id}/`, text, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    .then(({ data }) => data);
}
function deleteText(text) {
  return api.delete(`/api/v1/texts/${text.id}/`).then(({ data }) => data);
}
export default {
  addText,
  updateText,
  deleteText
};

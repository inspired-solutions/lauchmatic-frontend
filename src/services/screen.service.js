import api from "./api";

function addScreen(screen) {
  const formData = new FormData();
  Object.keys(screen).forEach(key =>
    key === "image"
      ? formData.append(
          key,
          screen[key],
          screen.id + "." + screen.url.split(";")[0].split("/")[1]
        )
      : formData.append(key, screen[key])
  );
  return api
    .post(`/api/v1/screens/`, formData, {
      headers: {
        Authorization: `JWT ${localStorage && localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data"
      }
    })
    .then(({ data }) => data);
}

export default {
  addScreen
};

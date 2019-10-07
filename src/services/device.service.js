import api from './api'

function addThumbnailDevice(device) {
  return api
    .post('/devices', device, {
      headers: {
        Authorization: `JWT ${localStorage && localStorage.getItem('token')}`,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    })
    .then(({ data }) => data)
}

function getThumbnailDevices(device) {
  return api.get('/devices', device).then(({ data }) => data)
}

export default {
  addThumbnailDevice,
  getThumbnailDevices,
}

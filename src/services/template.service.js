import api from './api'

function addTemplate(template) {
  return api
    .post('/api/v1/templates/', template, {
      headers: {
        Authorization: `JWT ${localStorage && localStorage.getItem('token')}`,
      },
    })
    .then(({ data }) => data)
}

function addTemplateDevice(templateId, device) {
  const formData = new FormData()
  Object.keys(device).forEach(key =>
    key === 'image'
      ? formData.append(key, device[key], device.id + '.' + device.name.split(';')[0].split('/')[1])
      : formData.append(key, device[key])
  )
  formData.append('template', templateId)
  return api
    .post(`/api/v1/devices/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `JWT ${localStorage && localStorage.getItem('token')}`,
      },
    })
    .then(({ data }) => data)
}

function getCustomerTemplates(userId) {
  return api
    .get(`/api/v1/templates`, {
      headers: { Authorization: `JWT ${localStorage && localStorage.getItem('token')}` },
      params: {
        creator: userId,
      },
    })
    .then(({ data }) => data)
}

function getAdminTemplates() {
  return api
    .get(`/api/v1/templates/base`, {
      headers: { Authorization: `JWT ${localStorage && localStorage.getItem('token')}` },
    })
    .then(({ data }) => data)
}

function getTemplatesByType(type) {
  return api.get(`/api/v1/templates/${type}`, {}).then(({ data }) => data)
}

function deleteTemplate(templateId) {
  return api
    .delete(`/api/v1/templates/${templateId}`, {
      headers: { Authorization: `JWT ${localStorage && localStorage.getItem('token')}` },
    })
    .then(({ data }) => data)
}

export default {
  addTemplate,
  addTemplateDevice,
  getAdminTemplates,
  getCustomerTemplates,
  getTemplatesByType,
  deleteTemplate,
}

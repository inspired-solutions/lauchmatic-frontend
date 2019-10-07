function getCurrentTemplate(templates, templateId) {
  return templates.find(template => template.id == templateId) || {};
}

export default { getCurrentTemplate };

import AppTypes from "../types/AppTypes";

const AppActions = {
  setLoading: loading => ({
    type: AppTypes.LOADING,
    payload: loading
  }),

  setSelectedModule: module => ({
    type: AppTypes.SET_SELECTED_MODULE,
    payload: module
  }),

  setCurrentDesign: design => ({
    type: AppTypes.SET_CURRENT_DESIGN,
    payload: design
  }),

  setCurrentTemplate: template => ({
    type: AppTypes.SET_CURRENT_TEMPLATE,
    payload: template
  }),

  setMenuMessage: message => ({
    type: AppTypes.SET_MENU_MESSAGE,
    payload: message
  }),
  setSaving: saving => ({
    type: AppTypes.SET_SAVING,
    payload: saving
  }),
  setThumbnail: thumbnail => ({
    type: AppTypes.SET_THUMBNAIL,
    payload: thumbnail
  })
};

export default AppActions;

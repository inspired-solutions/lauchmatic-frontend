import AdminTextsTypes from "../types/AdminTextTypes";

const AdminTextAction = {
  addText: text => ({
    type: AdminTextsTypes.ADMIN_ADD_TEXT,
    payload: text
  }),
  updateText: text => ({
    type: AdminTextsTypes.ADMIN_UPDATE_TEXT,
    payload: text
  }),
  deleteText: textId => ({
    type: AdminTextsTypes.ADMIN_DELETE_TEXT,
    payload: textId
  }),
  resetText: () => ({
    type: AdminTextsTypes.ADMIN_RESET_TEXTS
  })
};

export default AdminTextAction;

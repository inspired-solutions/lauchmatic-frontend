// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// class AdminPage extends Component {
//   render() {
//     return (
//       <div>
//         <h1>Admin Page</h1>
//       </div>
//     );
//   }
// }

// AdminPage.propTypes = {};

// export default AdminPage;

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import PropTypes from "prop-types";
import { SCREENS_TYPE } from "./../../common/constants/ScreensConstant";
import AdminAppAction from "./../../redux/actions/AdminAppActions";
import AdminTemplateAction from "./../../redux/actions/AdminTemplatesActions";
import AdminDeviceThumbnailAction from "./../../redux/actions/AdminDeviceThumbnailAction";
import fileHelpers from "./../../common/helpers/fileHelpers";
////////////////////////////////////////////////////////////////////////////////////////////////////
import LayoutAdmin from "./../../components/Layouts/Admin";
import Button from "./../../components/Button";
import Typography from "./../../components/Typography";
import Select from "./../../components/Select";
import Canvas from "./../../components/AdminPage/Canvas";
import AdminDevicesAction from "./../../redux/actions/AdminDeviceActions";
import AdminTextAction from "./../../redux/actions/AdminTextActions";
import { Redirect } from "react-router-dom";

// const LayoutAdmin = dynamic(() => import('@components/Layouts/Admin'))
// const Button = dynamic(() => import('@components/Button'))
// const Typography = dynamic(() => import('@components/Typography'))
// const Select = dynamic(() => import('@components/Select'))
// const Canvas = dynamic(() => import('@components/AdminPage/Canvas'))
////////////////////////////////////////////////////////////////////////////////////////////////////

function Admin({
  deviceThumbnails,
  deviceThumbnail,
  screenType,
  setDeviceThumbnail,
  setScreenType,
  devicesCanvas,
  getDeviceThumbnails,
  getAdminTemplates,
  addTemplate,
  resetDevicesCanvas,
  texts,
  resetText,
  auth,
}) {
  useEffect(() => {
    getDeviceThumbnails();
  }, []);
  const handleSaveTemplate = async e => {
    e.preventDefault();
    try {
      await addTemplate(
        {
          thumbnail_id: deviceThumbnail,
          screen_quantity: screenType
        },
        devicesCanvas.map(device => ({
          ...device,
          left: Number(device.left).toFixed(2),
          top: Number(device.top).toFixed(2),
          width: Number(device.width).toFixed(2),
          height: Number(device.height).toFixed(2),
          x: Number(device.x).toFixed(2),
          y: Number(device.y).toFixed(2),
          rotation: Number(device.rotation).toFixed(2),
          scaleX: Number(device.scaleX).toFixed(2),
          scaleY: Number(device.scaleY).toFixed(2),
          skewX: Number(device.skewX).toFixed(2),
          skewY: Number(device.skewY).toFixed(2),
          right: 0.0 /**this field dont must exist in any model */,
          image: fileHelpers.dataURLtoBlob(device.url)
        })),
        texts
      );
      await getAdminTemplates();
      await resetDevicesCanvas();
      await resetText();
      alert("se guardado con exito");
    } catch (error) {
      alert("Hubo un error con exito");
      console.log(error);
    }
  };
  if (!auth.is_superuser) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }
  return (
    <LayoutAdmin>
      <Canvas />

      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 32,
          width: 500,
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Button
          disabled={!deviceThumbnail || !devicesCanvas.length}
          color="primary"
          onClick={handleSaveTemplate}
          containerStyle={{
            borderRadius: 8,
            height: 36,
            width: 100
          }}
        >
          <Typography color="light" variant="body2">
            Save
          </Typography>
        </Button>
        <Select
          options={SCREENS_TYPE}
          value={screenType}
          optionsColor="grey-light"
          onChange={setScreenType}
          reverse
          containerStyle={{ marginLeft: 16, marginRight: 16 }}
        />
        <Select
          options={[
            {
              label: "Select device",
              value: "",
              icon:
                "https://storage.googleapis.com/test-template-47607.appspot.com/thumbnailDevices/57wCc7s16xKe549ER7tl.svg"
            },
            ...deviceThumbnails.map(device => ({
              label: device.name,
              value: device.id,
              icon: device.image
            }))
          ]}
          renderInput={option => {
            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={option.icon}
                  alt={option.url}
                  style={{
                    width: 24,
                    height: 24,
                    objectFit: "contain",
                    marginRight: 8
                  }}
                />
                <Typography variant="caption">{option.label}</Typography>
              </div>
            );
          }}
          renderOption={option => {
            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={option.icon}
                  alt={option.url}
                  style={{
                    width: 24,
                    height: 24,
                    objectFit: "contain",
                    marginRight: 8
                  }}
                />
                <Typography variant="caption">{option.label}</Typography>
              </div>
            );
          }}
          value={deviceThumbnail}
          optionsColor="grey-light"
          onChange={setDeviceThumbnail}
          reverse
        />
      </div>
    </LayoutAdmin>
  );
}

Admin.defaultProps = {
  deviceThumbnails: [],
  deviceThumbnail: 0,
  screenType: 1,
  texts: [],
  setDeviceThumbnail: () => {},
  setScreenType: () => {},
  devicesCanvas: [],
  getDeviceThumbnails: () => {},
  getAdminTemplates: () => {},
  addTemplate: () => {},
  resetDevicesCanvas: () => {},
  resetText: () => {}
};

Admin.propTypes = {
  deviceThumbnails: PropTypes.arrayOf(PropTypes.shape({})),
  deviceThumbnail: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  screenType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setDeviceThumbnail: PropTypes.func,
  setScreenType: PropTypes.func,
  devicesCanvas: PropTypes.arrayOf(PropTypes.shape({})),
  getDeviceThumbnails: PropTypes.func,
  getAdminTemplates: PropTypes.func,
  addTemplate: PropTypes.func,
  resetDevicesCanvas: PropTypes.func,
  resetText: PropTypes.func,
  texts: PropTypes.arrayOf(PropTypes.shape({}))
};
const mapStateToProps = state => ({
  deviceThumbnails: state.adminDeviceThumbnail.list,
  deviceThumbnail: state.adminApp.deviceThumbnail,
  screenType: state.adminApp.screenType,
  devicesCanvas: state.adminDevice.listDevicesCanvas,
  texts: state.adminText.list,
  auth: state.auth,
});
const mapDispatchToProps = {
  setDeviceThumbnail: AdminAppAction.setDeviceThumbnail,
  setScreenType: AdminAppAction.setScreenType,
  getAdminTemplates: AdminTemplateAction.getAdminTemplates,
  addTemplate: AdminTemplateAction.addTemplate,
  getDeviceThumbnails: AdminDeviceThumbnailAction.getDeviceThumbnails,
  resetDevicesCanvas: AdminDevicesAction.resetDevicesCanvas,
  resetText: AdminTextAction.resetText,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Admin);

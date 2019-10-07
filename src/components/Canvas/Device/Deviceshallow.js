/* eslint react/prop-types: 0 */ //

import React from "react";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import { compose } from "recompose";
import { ItemTypes } from "./../../../common/constants/ItemTypesConstant";
import ScreensActions from "./../../../redux/actions/ScreensActions";
import fileHelpers from "./../../../common/helpers/fileHelpers";
import TemplateAction from "./../../../redux/actions/TemplateAction";
////////////////////////////////////////////////////////////////////////////////////////////////////

function DeviceShallow({
  device,
  addScreenCanvas,
  template,
  screen,
  getCustomerTemplates
}) {
  const [, drop] = useDrop({
    accept: ItemTypes.SCREEN,
    drop: async item => {
      console.log("entro a drop");
      await addScreenCanvas({
        ...item.image,
        device_id: device.id,
        template_id: template.id,
        image: fileHelpers.dataURLtoBlob(item.image.url)
      });
      await getCustomerTemplates();
    },
    canDrop: () => true
  });
  return (
    <div
      ref={drop}
      style={{
        position: "absolute",
        left: +(+device.x).toFixed(2),
        top: +(+device.y).toFixed(2),
        width: +(+device.width).toFixed(2),
        height: +(+device.height).toFixed(2),
        transform: `rotate(${(+device.rotation).toFixed(2)}deg)`,
        transformOrigin: "top left",
        backgroundColor: "transparent",
        overflow: "hidden",
        zIndex: 1004
      }}
    >
      {/* {screen && (
        <img
          src={`${process.env.REACT_APP_NEXT_PUBLIC_API}${screen.image}`}
          alt={screen.id}
          style={{
            width: +(+device.width).toFixed(2),
            height: +(+device.height).toFixed(2),
            padding: 8,
            objectFit: 'cover',
          }}
        />
      )} */}
    </div>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  addScreenCanvas: ScreensActions.addScreenCanvas,
  getCustomerTemplates: TemplateAction.getCustomerTemplates
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DeviceShallow);

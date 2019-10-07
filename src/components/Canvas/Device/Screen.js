import React from "react";

import useImage from "use-image";
import PropTypes from "prop-types";
import IDevice from "./../.../../../../interfaces/IDevice";
import { Image } from "react-konva";

function Screen({ device, screen }) {
  const [imageDeviceLoaded] = useImage(
    `${process.env.REACT_APP_NEXT_PUBLIC_API}${screen.image}`,
    "Anonymous"
  );
  console.log(device);
  return (
    <Image
      image={imageDeviceLoaded}
      width={+device.width - 16}
      height={+device.height - 16}
      x={device.x + 8}
      y={device.y + 8}
      rotation={device.rotation}
    />
  );
}

Screen.defaultProps = {};

Screen.propTypes = {
  device: PropTypes.shape(IDevice).isRequired
};

export default Screen;

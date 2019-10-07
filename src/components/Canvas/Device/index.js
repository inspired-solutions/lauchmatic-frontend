import React from 'react'

import useImage from 'use-image'
import PropTypes from 'prop-types'
import IDevice from './../../../interfaces/IDevice'
import { Image } from 'react-konva'

function Device({ device }) {
  const [imageDeviceLoaded] = useImage(device.image, 'Anonymous')

  return (
    <Image
      onDragEnd={e => {
        console.log('entro  a  drop')
        console.log(e)
      }}
      image={imageDeviceLoaded}
      width={+device.width}
      height={+device.height}
      x={device.x}
      y={device.y}
      rotation={device.rotation}
    />
  )
}

Device.defaultProps = {}

Device.propTypes = {
  device: PropTypes.shape(IDevice).isRequired,
}

export default Device

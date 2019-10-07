import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'

////////////////////////////////////////////////////////////////////////////////////////////////////

function ImageCanvas({ image, x, y, width, height, rotation }) {
  const [imageLoaded] = useImage(image, 'Anonymous')
  return (
    <Image
      image={imageLoaded}
      x={x}
      y={y}
      width={width}
      height={height}
      rotation={rotation}
      // scaleX={device.scaleX}
      // scaleY={device.scaleY}
      // skewX={device.skewX}
      // skewY={device.skewY}
    />
  )
}
export default ImageCanvas

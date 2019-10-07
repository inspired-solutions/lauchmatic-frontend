import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'

////////////////////////////////////////////////////////////////////////////////////////////////////

function ImageCanvas({ image, x, y, width, height, rotation }) {
  const [imageLoaded] = useImage(image, 'Anonymous')
  console.log(image)
  return (
    <Image
      image={imageLoaded}
      x={Number(x)}
      y={Number(y)}
      width={Number(width)}
      height={Number(height)}
      rotation={Number(rotation)}
      // scaleX={device.scaleX}
      // scaleY={device.scaleY}
      // skewX={device.skewX}
      // skewY={device.skewY}
    />
  )
}
export default ImageCanvas

import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Image, Transformer } from 'react-konva'
import useImage from 'use-image'
import IImage from './../../../interfaces/IImage'
////////////////////////////////////////////////////////////////////////////////////////////////////

function ImageCanvas({ image, selected, setSelectedDevice, updateDeviceCanvas }) {
  // const canvasParent = document.getElementById('canvas')
  const trRef = useRef(null)
  const shapeRef = useRef(null)
  const [imageLoaded] = useImage(image.url, 'Anonymous')
  useEffect(() => {
    if (selected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current)
      trRef.current.getLayer().batchDraw()
    }
  }, [selected])
  console.log(image)
  return (
    <>
      {selected && <Transformer ref={trRef} />}
      <Image
        ref={shapeRef}
        image={imageLoaded}
        x={image.x}
        y={image.y}
        width={image.width}
        height={image.height}
        draggable
        onClick={async e => {
          e.cancelBubble = true
          await setSelectedDevice(image.id)
        }}
        onTransform={e => {
          shapeRef.current.setAttrs({
            width: shapeRef.current.width() * shapeRef.current.scaleX(),
            height: shapeRef.current.height() * shapeRef.current.scaleY(),
            scaleX: 1,
            scaleY: 1,
          })
        }}
        onDragEnd={e => {
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          console.log(node)
          const { rotation, skewX, skewY } = node.attrs

          // we will reset it back
          node.scaleX(1)
          node.scaleY(1)
          updateDeviceCanvas({
            ...image,
            x: node.x(),
            y: node.y(),
            left: node.x(),
            top: node.y(),
            width: (node.width() * scaleX).toFixed(2),
            height: (node.height() * scaleY).toFixed(2),
            rotation: Number((node.rotation()).toFixed(2)),
            scaleX,
            scaleY,
            skewX,
            skewY,
          })
        }}
        onTransformEnd={e => {
          // transformer is changing scale
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          console.log(node)
          const { rotation, skewX, skewY } = node.attrs

          // we will reset it back
          node.scaleX(1)
          node.scaleY(1)
          updateDeviceCanvas({
            ...image,
            x: node.x(),
            y: node.y(),
            left: node.x(),
            top: node.y(),
            width: (node.width() * scaleX).toFixed(2),
            height: (node.height() * scaleY).toFixed(2),
            rotation,
            scaleX,
            scaleY,
            skewX,
            skewY
          });
        }}
      />
    </>
  )
}

ImageCanvas.propTypes = {
  image: PropTypes.shape(IImage).isRequired,
  selected: PropTypes.bool.isRequired,
  setSelectedDevice: PropTypes.func.isRequired,
  updateDeviceCanvas: PropTypes.func.isRequired,
}
export default ImageCanvas

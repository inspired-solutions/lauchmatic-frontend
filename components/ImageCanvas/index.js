import React, { useRef, useEffect } from 'react'
import './styles.scss'
import PropTypes from 'prop-types'
import { Image, Transformer } from 'react-konva'
import useImage from 'use-image'
import IImage from '@interfaces/IImage'
////////////////////////////////////////////////////////////////////////////////////////////////////

function ImageCanvas({ image, selected, setImageCanvasSelected, updateImageCanvas }) {
  // const canvasParent = document.getElementById('canvas')
  const trRef = useRef(null)
  const shapeRef = useRef(null)
  const [imageLoaded] = useImage(image.url)
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
        x={image.left}
        y={image.top}
        width={image.width}
        height={image.height}
        draggable
        onClick={async e => {
          e.cancelBubble = true
          await setImageCanvasSelected(image.id)
        }}
        onTransform={e => {
          shapeRef.current.setAttrs({
            width: shapeRef.current.width() * shapeRef.current.scaleX(),
            height: shapeRef.current.height() * shapeRef.current.scaleY(),
            scaleX: 1,
            scaleY: 1,
          })
        }}
        onTransformEnd={e => {
          // transformer is changing scale
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          console.log(node)
          // we will reset it back
          node.scaleX(1)
          node.scaleY(1)
          updateImageCanvas({
            ...image,
            x: node.x(),
            y: node.y(),
            width: (node.width() * scaleX).toFixed(2),
            height: (node.height() * scaleY).toFixed(2),
          })
        }}
      />
    </>
  )
}

ImageCanvas.propTypes = {
  image: PropTypes.shape(IImage).isRequired,
  selected: PropTypes.bool.isRequired,
  setImageCanvasSelected: PropTypes.func.isRequired,
  updateImageCanvas: PropTypes.func.isRequired,
}
export default ImageCanvas

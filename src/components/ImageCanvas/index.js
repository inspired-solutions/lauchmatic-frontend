import React, { useRef, useEffect, useCallback } from 'react'
import './styles.scss'
import PropTypes from 'prop-types'
import { Image, Transformer } from 'react-konva'
import useImage from 'use-image'
import IImage from '@interfaces/IImage'
import _debounce from 'lodash-es/debounce'
////////////////////////////////////////////////////////////////////////////////////////////////////

function ImageCanvas({ image, selected, setImageCanvasSelected, updateImageCanvas }) {
  // const canvasParent = document.getElementById('canvas')
  const trRef = useRef(null)
  const shapeRef = useRef(null)
  const [imageLoaded] = useImage(process.env.NEXT_PUBLIC_API + image.image, 'Anonymous')

  const updateImageCallBack = useCallback(_debounce(image => updateImageCanvas(image), 2000), [])

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
        onDragEnd={e => {
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          console.log(node)
          // we will reset it back
          node.scaleX(1)
          node.scaleY(1)

          updateImageCallBack.cancel()
          updateImageCallBack({
            id: image.id,
            x: Number(node.x().toFixed(2)),
            y: Number(node.y().toFixed(2)),
            left: Number(node.x().toFixed(2)),
            top: Number(node.y().toFixed(2)),
            width: Number((node.width() * scaleX).toFixed(2)),
            height: Number((node.height() * scaleY).toFixed(2)),
            rotation: Number((node.rotation() * scaleY).toFixed(2)),
          })
        }}
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
          updateImageCallBack({
            id: image.id,
            x: Number(node.x().toFixed(2)),
            y: Number(node.y().toFixed(2)),
            left: Number(node.x().toFixed(2)),
            top: Number(node.y().toFixed(2)),
            width: Number((node.width() * scaleX).toFixed(2)),
            height: Number((node.height() * scaleY).toFixed(2)),
            rotation: Number((node.rotation() * scaleY).toFixed(2)),
          })
          // updateImageCanvas({
          //   ...image,
          //   x: node.x(),
          //   y: node.y(),
          //   width: (node.width() * scaleX).toFixed(2),
          //   height: (node.height() * scaleY).toFixed(2),
          // })
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

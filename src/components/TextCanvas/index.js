/* eslint prefer-destructuring: 0 */ //
/* eslint no-param-reassign: 0 */
import React, { useEffect, useRef, useCallback } from 'react'
import './styles.scss'

import PropTypes from 'prop-types'
import IText from './../../interfaces/IText'
import { Text, Transformer } from 'react-konva'
import TextHelpers from './../../common/helpers/TextHelpers'
import { TEXT_ALIGN, FONT_STYLES } from './../../common/constants/FontConstants'
import _debounce from 'lodash-es/debounce'
////////////////////////////////////////////////////////////////////////////////////////////////////

function TextCanvas({
  text,
  updateText,
  selected,
  setSelectedText,
  setTextRef,
  updateTextTemplate,
  template,
}) {
  const shapeRef = React.useRef(null)
  const trRef = useRef(null)
  let textarea = null

  const updateTextCallBack = useCallback(_debounce(text => updateText(text), 2000), [])

  useEffect(() => {
    if (selected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current)
      trRef.current.getLayer().batchDraw()
      setTextRef(shapeRef.current)
    }
  }, [selected])

  const id = text.id
  const value = text.value
  const x = Number(text.left)
  const y = Number(text.top)
  const fontFamily = text.font_family
  const align = (TEXT_ALIGN.find(align => align.value === Number(text.text_align)) || {}).label
  const fontSize = Number(text.font_size)
  const fontStyle = (FONT_STYLES.find(align => align.value === Number(text.font_style)) || {}).label
  const height = Number(text.height)
  const width = Number(text.width)
  const rotation = Number(text.rotation)

  console.log({ id, value, x, y, fontFamily, align, fontSize, fontStyle, height, width, rotation })

  return (
    <>
      {selected && <Transformer ref={trRef} />}
      <Text
        id={id}
        default
        text={value}
        x={x}
        y={y}
        fontFamily={fontFamily}
        align={align}
        fill={TextHelpers.getCanvasColor(text)}
        fontSize={fontSize}
        fontStyle={fontStyle}
        draggable
        ref={shapeRef}
        rotation={rotation}
        onClick={async e => {
          e.cancelBubble = true
          // e.evt.stopPropagation()
          // setIsEditing(true)
          await setSelectedText(text.id)
        }}
        onTransform={e => {
          shapeRef.current.setAttrs({
            width: shapeRef.current.width() * shapeRef.current.scaleX(),
            height: shapeRef.current.height() * shapeRef.current.scaleY(),
            scaleX: 1,
            scaleY: 1,
          })
        }}
        onDragEnd={async e => {
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          console.log(node)
          // we will reset it back
          node.scaleX(1)
          node.scaleY(1)
          await updateTextTemplate(template, {
            id: text.id,
            x: Number(node.x().toFixed(2)),
            y: Number(node.y().toFixed(2)),
            left: Number(node.x().toFixed(2)),
            top: Number(node.y().toFixed(2)),
            width: Number((node.width() * scaleX).toFixed(2)),
            height: Number((node.height() * scaleY).toFixed(2)),
            rotation: Number((node.rotation() * scaleY).toFixed(2)),
          })
          updateTextCallBack.cancel()
          updateTextCallBack({
            id: text.id,
            x: Number(node.x().toFixed(2)),
            y: Number(node.y().toFixed(2)),
            left: Number(node.x().toFixed(2)),
            top: Number(node.y().toFixed(2)),
            width: Number((node.width() * scaleX).toFixed(2)),
            height: Number((node.height() * scaleY).toFixed(2)),
            rotation: Number((node.rotation() * scaleY).toFixed(2)),
          })
        }}
        onTransformEnd={async e => {
          // transformer is changing scale
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          console.log(node)
          // we will reset it back
          node.scaleX(1)
          node.scaleY(1)
          await updateTextTemplate(template, {
            id: text.id,
            x: Number(node.x().toFixed(2)),
            y: Number(node.y().toFixed(2)),
            left: Number(node.x().toFixed(2)),
            top: Number(node.y().toFixed(2)),
            width: Number((node.width() * scaleX).toFixed(2)),
            height: Number((node.height() * scaleY).toFixed(2)),
            rotation: Number((node.rotation() * scaleY).toFixed(2)),
          })
          updateTextCallBack.cancel()
          updateTextCallBack({
            id: text.id,
            x: Number(node.x().toFixed(2)),
            y: Number(node.y().toFixed(2)),
            left: Number(node.x().toFixed(2)),
            top: Number(node.y().toFixed(2)),
            width: Number((node.width() * scaleX).toFixed(2)),
            height: Number((node.height() * scaleY).toFixed(2)),
            rotation: Number((node.rotation() * scaleY).toFixed(2)),
          })
        }}
        onDblClick={e => {
          e.cancelBubble = true
          shapeRef.current.hide()
          trRef.current.hide()
          console.log(trRef.current)
          const layer = e.target.getLayer()
          layer.draw()
          const textPosition = e.target.getAbsolutePosition()
          const stageBox = e.target
            .getStage()
            .container()
            .getBoundingClientRect()

          const areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y,
          }

          textarea = document.createElement('textarea')
          document.body.appendChild(textarea)

          // apply many styles to match text on canvas as close as possible
          // remember that text rendering on canvas and on the textarea can be different
          // and sometimes it is hard to make it 100% the same. But we will try...
          textarea.value = shapeRef.current.text()
          textarea.style.position = 'absolute'
          textarea.style.top = `${areaPosition.y}px`
          textarea.style.left = `${areaPosition.x}px`
          textarea.style.width = `${shapeRef.current.width() - shapeRef.current.padding() * 2}px`
          textarea.style.height = `${shapeRef.current.height() -
            shapeRef.current.padding() * 2 +
            5}px`
          textarea.style.fontSize = `${shapeRef.current.fontSize()}px`
          textarea.style.border = 'none'
          textarea.style.padding = '0px'
          textarea.style.margin = '0px'
          textarea.style.overflow = 'hidden'
          textarea.style.background = 'none'
          textarea.style.outline = 'none'
          textarea.style.resize = 'none'
          textarea.style.lineHeight = shapeRef.current.lineHeight()
          textarea.style.fontFamily = shapeRef.current.fontFamily()
          textarea.style.transformOrigin = 'left top'
          textarea.style.textAlign = shapeRef.current.align()
          textarea.style.color = shapeRef.current.fill()
          textarea.select()
          const rotation = shapeRef.current.rotation()
          let transform = ''
          if (rotation) {
            transform += `rotateZ(${rotation}deg)`
          }

          textarea.style.transform = transform

          // reset height
          textarea.style.height = 'auto'
          // after browsers resized it we can set actual value
          textarea.style.height = `${textarea.scrollHeight + 3}px`
          textarea.focus()

          const setTextareaWidth = newWidth => {
            if (!newWidth) {
              // set width for placeholder
              newWidth = shapeRef.current.placeholder.length * shapeRef.current.fontSize()
            }
            // some extra fixes on different browsers
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
            const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
            if (isSafari || isFirefox) {
              newWidth = Math.ceil(newWidth)
            }

            const isEdge = document.documentMode || /Edge/.test(navigator.userAgent)
            if (isEdge) {
              newWidth += 1
            }
            textarea.style.width = `${newWidth}px`
          }

          textarea.addEventListener('keydown', e => {
            // hide on enter
            // but don't hide on shift + enter
            if (e.keyCode === 13 && !e.shiftKey) {
              shapeRef.current.text(textarea.value)
              textarea.blur()
            }
            // on esc do not set value back to node
            if (e.keyCode === 27) {
              textarea.blur()
            }
          })

          textarea.addEventListener('keydown', e => {
            const scale = shapeRef.current.getAbsoluteScale().x
            setTextareaWidth(shapeRef.current.width() * scale)
            textarea.style.height = 'auto'
            textarea.style.height = `${textarea.scrollHeight + shapeRef.current.fontSize()}px`
          })
          textarea.addEventListener('blur', async e => {
            textarea.parentNode.removeChild(textarea)
            shapeRef.current.show()
            trRef.current.show()
            trRef.current.forceUpdate()
            trRef.current.getLayer().draw()
            await updateTextTemplate(template, { id: text.id, value: textarea.value })
            updateTextCallBack.cancel()
            updateTextCallBack({
              value: textarea.value,
              id: text.id,
            })
          })
        }}
        // stroke={text.color}
        // strokeWidth={1}
        // height={height}
        // width={width}
        height={100}
        width={200}
      />
    </>
  )
}

TextCanvas.defaultProps = {}

TextCanvas.propTypes = {
  text: PropTypes.shape(IText).isRequired,
  updateText: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  setSelectedText: PropTypes.func.isRequired,
  setTextRef: PropTypes.func.isRequired,
  updateTextTemplate: PropTypes.func.isRequired,
  template: PropTypes.shape({}).isRequired,
}

export default TextCanvas

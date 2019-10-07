/* eslint jsx-a11y/mouse-events-have-key-events: 0 */ //

import { useDrop } from 'react-dnd'

import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'

import { Stage, Layer } from 'react-konva'
import ItemTypes from '../../../common/ItemTypes'
import AdminDevicesAction from './../../../redux/actions/AdminDeviceActions'
import AdminAppAction from './../../../redux/actions/AdminAppActions'
import ImageCanvas from '../ImageCanvas'
import { SELECTED_MODULE } from "../../../common/constants/SelectedModuleConstant";
import AdminTemplateAction from './../../../redux/actions/AdminTemplatesActions'
import AdminTextAction from './../../../redux/actions/AdminTextActions'
import TextCanvas from './TextCanvas'
import uuid from 'uuid/v1'

function Canvas({
  screenType,
  addDevicesCanvas,
  devices,
  setSelectedDevice,
  seletedDevice,
  updateDeviceCanvas,
  selectedModule,
  getAdminTemplates,
  selectedText,
  addText,
  deleteText,
  texts,
  setSelectedText,
  updateText,
}) {
  const [textRef, setTextRef] = useState(null)
  const stageRef = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.DEVICE,
    drop: (item, monitor) => {
      console.log('entro')
      const canvas = document.getElementById('canvas')
      const offset = canvas.getClientRects()[0]
      const { x, y } = monitor.getClientOffset()
      const left = x - offset.left
      const top = y - offset.top
      const imageCanvasPosition = {
        left: Number((left - item.image.left).toFixed(2)),
        top: Number((top - item.image.top).toFixed(2)),
        x: Number((left - item.image.left).toFixed(2)),
        y: Number((top - item.image.top).toFixed(2)),
      }
      addDevicesCanvas({
        ...item.image,
        ...imageCanvasPosition,
        width: 100,
        height: 200,
      })
    },
    canDrop: () => true,
    collect: monitor => ({
      isOver: !!monitor.isOver,
      canDrop: !!monitor.canDrop,
      position: monitor.getClientOffset(),
    }),
  })
  const getWidth = () => {
    switch (screenType) {
      case 2:
        return 552
      case 3:
        return 836
      default:
        return 268
    }
  }
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={e => {}}
      id="canvas"
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: 64,
        marginLeft: 464,
        background: 'white',
        width: getWidth(),
      }}
      ref={drop}
    >
      {screenType === 2 && (
        <div
          style={{
            position: 'absolute',
            width: 16,
            height: '100%',
            zIndex: 1000,
            backgroundColor: 'var(--color-background)',
          }}
        />
      )}
      {screenType === 3 && (
        <>
          <div
            style={{
              position: 'absolute',
              left: 268,
              width: 16,
              zIndex: 1000,
              height: '100%',
              backgroundColor: 'var(--color-background)',
            }}
          />
          <div
            style={{
              right: 268,
              position: 'absolute',
              width: 16,
              zIndex: 1000,
              height: '100%',
              backgroundColor: 'var(--color-background)',
            }}
          />
        </>
      )}
      <Stage
        width={getWidth()}
        height={478}
        ref={stageRef}
        onMouseOver={e => {
          if (selectedModule === SELECTED_MODULE.TEXT && !selectedText.id) {
            e.target.getStage().container().style.cursor = 'crosshair'
          } else {
            e.target.getStage().container().style.cursor = 'default'
          }
          e.cancelBubble = true
        }}
        onClick={async e => {
          const x = e.evt.offsetX
          const y = e.evt.offsetY
          /**delete text empty on click blur text , beacue not event in text canvas konva component */
          if (selectedText.id && !selectedText.value) {
            deleteText({ id: selectedText })
            setSelectedText({})
            console.log('entro')
            return
          }
          if (!selectedText.id && selectedModule === SELECTED_MODULE.TEXT) {
            console.log('entro')
            const newText = {
              id: uuid(),
              value: 'Enter Your Text Here',
              left: Number(x).toFixed(2),
              top: Number(y).toFixed(2),
              font_family: 'Poppins',
              font_size: 12,
              font_style: 1,
              text_align: 1,
              color: {
                hex: '#000000',
                opacity: 100,
              },
              width: 100,
              height: 48,
              right: 0,
              rotation: 0,
              scaleX: 1,
              scaleY: 1,
              skewX: 1,
              skewY: 1,
              x: Number(x).toFixed(2),
              y: Number(y).toFixed(2),
            }
            addText(newText)
            setSelectedText(newText)
            return
          }
          setSelectedText({})
        }}
      >
        <Layer>
          {devices.map(image => (
            <ImageCanvas
              image={image}
              key={image.id}
              setSelectedDevice={setSelectedDevice}
              updateDeviceCanvas={updateDeviceCanvas}
              selected={image.id === seletedDevice}
            />
          ))}
        </Layer>
        <Layer>
          {texts.map(text => (
            <TextCanvas
              key={text.id}
              setTextRef={setTextRef}
              text={text}
              updateText={updateText}
              deleteText={deleteText}
              selected={selectedText.id === text.id}
              setSelectedText={setSelectedText}
              selectedModule={selectedModule}
              selectedText={selectedText}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

const mapStateToProps = state => ({
  screenType: state.adminApp.screenType,
  seletedDevice: state.adminApp.seletedDevice,
  devices: state.adminDevice.listDevicesCanvas,
  selectedModule: state.adminApp.selectedModule,
  selectedText: state.adminApp.selectedText,
  texts: state.adminText.list,
})

const mapDispatchToProps = {
  addDevicesCanvas: AdminDevicesAction.addDevicesCanvas,
  setSelectedDevice: AdminAppAction.setSelectedDevice,
  updateDeviceCanvas: AdminDevicesAction.updateDeviceCanvas,
  getAdminTemplates: AdminTemplateAction.getAdminTemplates,
  addText: AdminTextAction.addText,
  updateText: AdminTextAction.updateText,
  deleteText: AdminTextAction.deleteText,
  setSelectedText: AdminAppAction.setSelectedText,
}

Canvas.defaultProps = {}

Canvas.propTypes = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas)

import React, { useRef } from 'react'
import classNames from 'classnames'
import { Stage, Layer } from 'react-konva'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '@common/constants/ItemTypesConstant'
import Typography from '@components/Typography'
import Device from '@components/Canvas/Device'
import DeviceShallow from '@components/Canvas/Device/Deviceshallow'
import ImageCanvas from '@components/ImageCanvas'
import TextCanvas from '@components/TextCanvas'
import { TEMPLATE_TYPES } from '@common/constants/TemplateConstant'
import { SELECTED_MODULE } from '@common/constants/SelectedModuleConstant'
import fileHelpers from '@common/helpers/fileHelpers'

////////////////////////////////////////////////////////////////////////////////////////////////////

import { useAppState } from '@components/AppStateProvider'
////////////////////////////////////////////////////////////////////////////////////////////////////

function CanvasTemplate({
  selectedText,
  imageCanvasSelected,
  deleteText,
  isCursorCrossHair,
  template,
  removeImageCanvas,
  getCustomerTemplates,
  setCurrentTemplate,
  resetTextState,
  resetImagesState,
  resetScreensState,
  resetBackgroundActions,
  getWidth,
  getBackgroundFromSelectedMode,
  addImageCanvas,
  addText,
  setSelectedText,
  setImageCanvasSelected,
  setTextRef,
  images,
  textRef,
  updateImageCanvas,
  updateText,
  selectedModule,
  handleDeleteTemplate,
}) {
  const [state, dispatch] = useAppState()
  const stageRef = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    drop: async (item, monitor) => {
      console.log('entro a ondrop')
      const canvas = document.getElementById('canvas' + template.id)
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

      await addImageCanvas({
        ...item.image,
        ...imageCanvasPosition,
        right: 0,
        template: template.id,
        image: fileHelpers.dataURLtoBlob(item.image.url),
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        skewX: 1,
        skewY: 1,
      })
      await getCustomerTemplates()

      console.log('entro')
    },
    canDrop: () => true,
    collect: monitor => ({
      isOver: !!monitor.isOver,
      canDrop: !!monitor.canDrop,
      position: monitor.getClientOffset(),
    }),
  })

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={async e => {
        e.stopPropagation()
        if (selectedText && e.keyCode === 46) {
          console.log(selectedText)
          await deleteText({ id: selectedText })
          await getCustomerTemplates()
          return
        }
        if (selectedText && e.keyCode === 13) {
          // console.log(textRef.fire('dblclick'))
        }
        if (imageCanvasSelected && e.keyCode === 46) {
          await removeImageCanvas({ id: imageCanvasSelected })
          await getCustomerTemplates()
        }
      }}
      id={'canvas' + template.id}
      className={classNames(
        {
          [`c-canvas--cursor-cross-hair`]: isCursorCrossHair,
        },
        'c-canvas'
      )}
      // onClick={handleClick}
      style={{
        background: getBackgroundFromSelectedMode() || 'white',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        /**latest added */
        height: 478,
        /**latest added */
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: 64,

        width: getWidth(template.screen_quantity),
        // overflow: 'hidden',
      }}
      ref={drop}
      onMouseEnter={() => {
        console.log('entro')
      }}
      onClick={() => {
        setCurrentTemplate(template)
        console.log(stageRef.current.toDataURL({ pixelRatio: 3 }))
        dispatch({ type: 'SET_TEMPLATE_REF', payload: stageRef.current })
      }}
    >
      <div
        className="c-canvas__title"
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.keyCode === 46) {
            // setCurrentTemplate(null)
            // resetTextState()
            // resetImagesState()
            // resetScreensState()
            // resetBackgroundActions()
            handleDeleteTemplate(template.id)
          }
        }}
      >
        <Typography variant="caption"> Template #{template.id}</Typography>
      </div>
      {template.screen_quantity === TEMPLATE_TYPES.TWO_SCREEN && (
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
      {template.screen_quantity === TEMPLATE_TYPES.THREE_SCREEN && (
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
      {template.devices.map(device => (
        <DeviceShallow device={device} key={device.id} />
      ))}
      <Stage
        ref={stageRef}
        width={getWidth(template.screen_quantity)}
        height={478}
        onClick={async e => {
          const x = e.evt.offsetX
          const y = e.evt.offsetY
          if (selectedText && textRef && !textRef.attrs.text) {
            await deleteText({ id: selectedText })
            await getCustomerTemplates()
          }
          if (!selectedText && !imageCanvasSelected && selectedModule === SELECTED_MODULE.TEXT) {
            await addText({
              template: template.id,
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
              height: 28,
              width: 180,
              right: 0,
              rotation: 0,
              scaleX: 1,
              scaleY: 1,
              skewX: 1,
              skewY: 1,
              x: Number(x).toFixed(2),
              y: Number(y).toFixed(2),
            })
            await getCustomerTemplates()
            return
          }
          await setSelectedText(null)
          await setSelectedText(null)
          await setImageCanvasSelected(null)
          setTextRef(null)
        }}
      >
        <Layer>
          {template.texts_list.map(text => (
            <TextCanvas
              key={text.id}
              setTextRef={setTextRef}
              text={text}
              updateText={updateText}
              deleteText={deleteText}
              selected={selectedText === text.id}
              setSelectedText={setSelectedText}
            />
          ))}
        </Layer>
        <Layer>
          {template.images_list.map(image => (
            <ImageCanvas
              image={image}
              key={image.id}
              setImageCanvasSelected={setImageCanvasSelected}
              updateImageCanvas={updateImageCanvas}
              selected={image.id === imageCanvasSelected}
            />
          ))}
        </Layer>
        <Layer>
          {template.devices.map(device => (
            <Device
              device={device}
              key={device.id}
              // addScreenCanvas={addScreenCanvas}
              // setSelectedDevice={setSelectedDevice}
              // updateDeviceCanvas={updateDeviceCanvas}
              // selected={image.id === seletedDevice}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default CanvasTemplate

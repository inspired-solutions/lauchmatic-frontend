import React, { useRef } from 'react'
import classNames from 'classnames'
import { Stage, Layer } from 'react-konva'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './../../../common/constants/ItemTypesConstant'
import Typography from './../../Typography'
import Device from './../../Canvas/Device'
import DeviceShallow from './../../Canvas/Device/Deviceshallow'
import ImageCanvas from './../../ImageCanvas'
import TextCanvas from './../../TextCanvas'
import { SELECTED_MODULE } from './../../../common/constants/SelectedModuleConstant'
import fileHelpers from './../../../common/helpers/fileHelpers'
import Background from './Background'
import ScreenCanvas from '../Device/Screen'
////////////////////////////////////////////////////////////////////////////////////////////////////

import { useAppState } from './../../AppStateProvider'
import Gutters from './Gutters'
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
  // getBackgroundFromSelectedMode,
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
  updateTextTemplate,
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
  const getScreen = (screenList, deviceId) => {
    return screenList.find(screen => screen.device == deviceId)
  }

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
        // background: getBackgroundFromSelectedMode() || 'white',
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
      onClick={async () => {
        await setCurrentTemplate(template)
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
      {/* /**only for detect drop event from screen menu  */}
      {template.devices.map(device => (
        <DeviceShallow
          device={device}
          key={device.id}
          template={template}
          screen={getScreen(template.screens_list, device.id)}
        />
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
        <Background width={getWidth(template.screen_quantity)} height={478} template={template} />
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
              template={template}
              updateTextTemplate={updateTextTemplate}
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
            <>
              <Device device={device} key={device.id} />
              {getScreen(template.screens_list, device.id) && (
                <ScreenCanvas
                  device={device}
                  screen={getScreen(template.screens_list, device.id)}
                />
              )}
            </>
          ))}
        </Layer>
        <Gutters width={getWidth(template.screen_quantity)} height={478} template={template} />
      </Stage>
    </div>
  )
}

export default CanvasTemplate

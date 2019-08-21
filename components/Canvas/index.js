import './styles.scss'
import { useDrop } from 'react-dnd'
import { COLOR_FILL_TYPE } from '@common/constants/BackgroundConstant'
import { SELECTED_MODULE } from '@common/constants/SelectedModuleConstant'
import { TEMPLATE_TYPES } from '@common/constants/TemplateConstant'
import BackgroundHelper from '@common/helpers/BackgroundHelper'
import { getRgba } from '@common/helpers/ColorHelpers'
import IBackground from '@interfaces/IBackground'
import ITemplate from '@interfaces/ITemplate'
import IText from '@interfaces/IText'
import AppActions from '@redux/actions/AppActions'
import ImagesActions from '@redux/actions/ImagesActions'
import TextActions from '@redux/actions/TextActions'
import AddIcon from '@svgs/add.svg'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'

import Icon from '../Icon'
import Typography from '../Typography'

import { Stage, Layer } from 'react-konva'
import TextCanvas from '@components/TextCanvas'
import { ItemTypes } from '@common/constants/ItemTypesConstant'
import ImageCanvas from '@components/ImageCanvas'
import ScreensActions from '@redux/actions/ScreensActions';
import BackgroundActions from '@redux/actions/BackgroundActions';

function Canvas({
  isOpenMenu,
  isCursorCrossHair,
  addText,
  texts,
  selectedText,
  updateText,
  images,
  deleteText,
  addImageCanvas,
  setSelectedText,
  background,
  currentTemplate,
  setSelectedModule,
  gradientColorStart,
  gradientColorEnd,
  type,
  setImageCanvasSelected,
  updateImageCanvas,
  imageCanvasSelected,
  removeImageCanvas,
  setCurrentTemplate,

  resetTextState,
  resetImagesState,
  resetScreensState,
  resetBackgroundActions,
}) {
  const [textRef, setTextRef] = useState(null)
  const [, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    drop: (item, monitor) => {
      const canvas = document.getElementById('canvas')
      const offset = canvas.getClientRects()[0]
      const { x, y } = monitor.getClientOffset()
      const left = x - offset.left
      const top = y - offset.top
      const imageCanvasPosition = {
        left: Number((left - item.image.left).toFixed(2)),
        top: Number((top - item.image.top).toFixed(2)),
      }
      addImageCanvas({
        ...item.image,
        ...imageCanvasPosition,
      })
    },
    canDrop: () => true,
    collect: monitor => ({
      isOver: !!monitor.isOver,
      canDrop: !!monitor.canDrop,
      position: monitor.getClientOffset(),
    }),
  })

  const getBackgroundFromSelectedMode = () => {
    switch (type) {
      case COLOR_FILL_TYPE.SOLID_FILL_ONE_COLOR:
        return BackgroundHelper.getBackgroundColor(background.value)

      case COLOR_FILL_TYPE.GRADIENT_FILL_LINEAR:
        return `linear-gradient(to right, ${getRgba(gradientColorStart.value)}, ${getRgba(
          gradientColorEnd.value
        )})`

      case COLOR_FILL_TYPE.GRADIENT_FILL_RADIAL:
        return `radial-gradient(circle, ${getRgba(gradientColorStart.value)}, ${getRgba(
          gradientColorEnd.value
        )})`

      default:
        return ''
    }
  }

  if (!currentTemplate) {
    return (
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        className={classNames(
          {
            [`c-canvas--moved`]: isOpenMenu,
          },
          `c-canvas--no-template`,
          'c-canvas'
        )}
        onClick={() => {
          setSelectedModule(SELECTED_MODULE.TEMPLATES)
        }}
      >
        <Icon size="large" color="text-secondary">
          <AddIcon />
        </Icon>
        <Typography
          color="text-secondary"
          variant="body1"
          style={{ marginTop: 16 }}
          weight="semi-bold"
        >
          Add Template
        </Typography>
      </div>
    )
  }
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        e.stopPropagation()
        if (selectedText && e.keyCode === 46) {
          console.log(selectedText)
          deleteText({ id: selectedText })
        }
        if (selectedText && e.keyCode === 13) {
          // console.log(textRef.fire('dblclick'))
        }
        if (imageCanvasSelected && e.keyCode === 46) {
          removeImageCanvas({ id: imageCanvasSelected })
        }
      }}
      id="canvas"
      className={classNames(
        {
          [`c-canvas--moved`]: isOpenMenu,
          [`c-canvas--cursor-cross-hair`]: isCursorCrossHair,
          [`c-canvas--one-screen`]: currentTemplate.type === TEMPLATE_TYPES.ONE_SCREEN,
          [`c-canvas--two-screen`]: currentTemplate.type === TEMPLATE_TYPES.TWO_SCREEN,
        },
        'c-canvas'
      )}
      // onClick={handleClick}
      style={{
        background: getBackgroundFromSelectedMode(),
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
      ref={drop}
    >
      <div
        className="c-canvas__title"
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.keyCode === 46) {
            setCurrentTemplate(null)
            resetTextState()
            resetImagesState()
            resetScreensState()
            resetBackgroundActions()
          }
        }}
      >
        <Typography variant="caption">Title</Typography>
      </div>
      <Stage
        width={804}
        height={478}
        onClick={async e => {
          const x = e.evt.offsetX
          const y = e.evt.offsetY
          if (selectedText && !textRef.attrs.text) {
            deleteText({ id: selectedText })
          }
          if (!selectedText && !imageCanvasSelected) {
            addText({
              value: 'Enter Your Text Here',
              left: x,
              top: y,
              fontFamily: 'Poppins',
              fontSize: 12,
              fontStyle: 'normal',
              textAlign: 'left',
              color: {
                hex: '#000000',
                opacity: 100,
              },
            })
            return
          }
          await setSelectedText(null)
          await setSelectedText(null)
          await setImageCanvasSelected(null)
          setTextRef(null)
        }}
      >
        <Layer>
          {texts.map(text => (
            <TextCanvas
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
          {images.map(image => (
            <ImageCanvas
              image={image}
              key={image.id}
              setImageCanvasSelected={setImageCanvasSelected}
              updateImageCanvas={updateImageCanvas}
              selected={image.id === imageCanvasSelected}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

const mapStateToProps = state => ({
  images: state.images.listImagesCanvas,
  background: state.backgrounds.background,
  currentTemplate: state.app.currentTemplate,
  selectedText: state.texts.selectedText,
  imageCanvasSelected: state.images.imageCanvasSelected,
  texts: state.texts.list,

  type: state.backgrounds.type,
  gradientColorStart: state.backgrounds.gradientColorStart,
  gradientColorEnd: state.backgrounds.gradientColorEnd,
})

const mapDispatchToProps = {
  addImageCanvas: ImagesActions.addImageCanvas,
  updateImageCanvas: ImagesActions.updateImageCanvas,
  setDraggable: TextActions.setDraggable,
  setSelectedText: TextActions.setSelectedText,
  setImageCanvasSelected: ImagesActions.setImageCanvasSelected,
  setSelectedModule: AppActions.setSelectedModule,
  addText: TextActions.addText,
  updateText: TextActions.updateText,
  deleteText: TextActions.deleteText,
  removeImageCanvas: ImagesActions.removeImageCanvas,
  setCurrentTemplate: AppActions.setCurrentTemplate,
  resetTextState: TextActions.resetTextState,
  resetImagesState: ImagesActions.resetImagesState,
  resetScreensState: ScreensActions.resetScreensState,
  resetBackgroundActions: BackgroundActions.resetBackgroundActions,
}

Canvas.defaultProps = {
  texts: [],
  images: [],
  background: {},
  currentTemplate: {},

  type: '',
  gradientColorStart: {},
  gradientColorEnd: {},
  selectedText: '',
  imageCanvasSelected: '',

  addImageCanvas: () => {},
  updateImageCanvas: () => {},
  setSelectedText: () => {},
  setSelectedModule: () => {},
  addText: () => {},
  updateText: () => {},
  deleteText: () => {},
  removeImageCanvas: () => {},
  setImageCanvasSelected: () => {},
  setCurrentTemplate: () => {},

  resetTextState: ()=>{},
  resetImagesState: ()=>{},
  resetScreensState: ()=>{},
  resetBackgroundActions: ()=>{},
}

Canvas.propTypes = {
  isOpenMenu: PropTypes.bool.isRequired,
  isCursorCrossHair: PropTypes.bool.isRequired,
  texts: PropTypes.arrayOf(PropTypes.shape(IText)),
  selectedText: PropTypes.string,
  imageCanvasSelected: PropTypes.string,
  updateText: PropTypes.func,
  deleteText: PropTypes.func,

  images: PropTypes.arrayOf(PropTypes.shape({})),
  background: PropTypes.shape(IBackground),
  currentTemplate: PropTypes.shape(ITemplate),

  type: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  gradientColorStart: PropTypes.shape(IBackground),
  gradientColorEnd: PropTypes.shape(IBackground),

  addImageCanvas: PropTypes.func,
  updateImageCanvas: PropTypes.func,
  removeImageCanvas: PropTypes.func,
  setSelectedText: PropTypes.func,
  setImageCanvasSelected: PropTypes.func,
  setSelectedModule: PropTypes.func,
  setCurrentTemplate: PropTypes.func,
  addText: PropTypes.func,

  resetTextState: PropTypes.func,
  resetImagesState: PropTypes.func,
  resetScreensState: PropTypes.func,
  resetBackgroundActions: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas)

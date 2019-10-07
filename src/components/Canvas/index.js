import './styles.scss'
import { useDrop } from 'react-dnd'
import { SELECTED_MODULE } from './../../common/constants/SelectedModuleConstant'
import { TEMPLATE_TYPES } from './../../common/constants/TemplateConstant'
import ITemplate from './../../interfaces/ITemplate'
import IText from './../../interfaces/IText'
import AppActions from './../../redux/actions/AppActions'
import ImagesActions from './../../redux/actions/ImagesActions'
import TextActions from './../../redux/actions/TextActions'
import AddIcon from './../../svgs/add.svg'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'

import Icon from '../Icon'
import Typography from '../Typography'

import { ItemTypes } from './../../common/constants/ItemTypesConstant'
import ScreensActions from './../../redux/actions/ScreensActions'
import BackgroundActions from './../../redux/actions/BackgroundActions'
import TemplateAction from './../../redux/actions/TemplateAction'
import CanvasTemplate from './CanvasTemplate'

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
  currentTemplate,
  setSelectedModule,
  // background,
  // gradientColorStart,
  // gradientColorEnd,
  // type,
  setImageCanvasSelected,
  updateImageCanvas,
  imageCanvasSelected,
  removeImageCanvas,
  setCurrentTemplate,
  getCustomerTemplates,

  resetTextState,
  resetImagesState,
  resetScreensState,
  resetBackgroundActions,
  templatesOneScreen,
  templatesTwoScreen,
  templatesThreeScreen,
  thumbnail,
  selectedModule,
  deleteCustomerTemplate,
  updateTextTemplate,
}) {
  const [textRef, setTextRef] = useState(null)
  const [, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    drop: (item, monitor) => {
      console.log('entro a ondrop')
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

      console.log('entro')
    },
    canDrop: () => true,
    collect: monitor => ({
      isOver: !!monitor.isOver,
      canDrop: !!monitor.canDrop,
      position: monitor.getClientOffset(),
    }),
  })
  const getWidth = screenType => {
    switch (screenType) {
      case TEMPLATE_TYPES.TWO_SCREEN:
        return 552
      case TEMPLATE_TYPES.THREE_SCREEN:
        return 836
      default:
        return 268
    }
  }
  const handleDeleteTemplate = async templateId => {
    try {
      await deleteCustomerTemplate(templateId)
      await getCustomerTemplates()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div
      id="customer-canvas"
      style={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        minWidth: 2000,
        minHeight: 2000,
      }}
    >
      {[...templatesOneScreen, ...templatesTwoScreen, ...templatesThreeScreen]
        .filter(template => template.thumbnail.id === thumbnail)
        .map(template => (
          <CanvasTemplate
            selectedText={selectedText}
            imageCanvasSelected={imageCanvasSelected}
            deleteText={deleteText}
            isCursorCrossHair={isCursorCrossHair}
            template={template}
            removeImageCanvas={removeImageCanvas}
            getCustomerTemplates={getCustomerTemplates}
            setCurrentTemplate={setCurrentTemplate}
            resetTextState={resetTextState}
            resetImagesState={resetImagesState}
            resetScreensState={resetScreensState}
            resetBackgroundActions={resetBackgroundActions}
            getWidth={getWidth}
            // getBackgroundFromSelectedMode={getBackgroundFromSelectedMode}
            addImageCanvas={addImageCanvas}
            addText={addText}
            setSelectedText={setSelectedText}
            setImageCanvasSelected={setImageCanvasSelected}
            setTextRef={setTextRef}
            images={images}
            textRef={textRef}
            updateImageCanvas={updateImageCanvas}
            updateText={updateText}
            selectedModule={selectedModule}
            handleDeleteTemplate={handleDeleteTemplate}
            updateTextTemplate={updateTextTemplate}
          />
        ))}

      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        className={classNames([`c-canvas--no-template`, 'c-canvas'])}
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
    </div>
  )
}

const mapStateToProps = state => ({
  images: state.images.listImagesCanvas,
  currentTemplate: state.app.currentTemplate,
  selectedText: state.texts.selectedText,
  selectedModule: state.app.selectedModule,
  imageCanvasSelected: state.images.imageCanvasSelected,
  texts: state.texts.list,
  thumbnail: state.app.thumbnail,

  // type: state.backgrounds.type,
  // background: state.backgrounds.background,
  // gradientColorStart: state.backgrounds.gradientColorStart,
  // gradientColorEnd: state.backgrounds.gradientColorEnd,

  templatesOneScreen: state.template.templatesOneScreen,
  templatesTwoScreen: state.template.templatesTwoScreen,
  templatesThreeScreen: state.template.templatesThreeScreen,
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
  getCustomerTemplates: TemplateAction.getCustomerTemplates,
  deleteCustomerTemplate: TemplateAction.deleteCustomerTemplate,
  updateTextTemplate: TemplateAction.updateTextTemplate,
}

Canvas.defaultProps = {
  texts: [],
  images: [],
  currentTemplate: {},
  templatesOneScreen: [],
  templatesTwoScreen: [],
  templatesThreeScreen: [],
  thumbnail: '',

  // background: {},
  // type: '',
  // gradientColorStart: {},
  // gradientColorEnd: {},
  selectedText: '',
  imageCanvasSelected: '',
  selectedModule: '',

  addImageCanvas: () => {},
  deleteCustomerTemplate: () => {},
  updateImageCanvas: () => {},
  setSelectedText: () => {},
  setSelectedModule: () => {},
  addText: () => {},
  updateText: () => {},
  deleteText: () => {},
  removeImageCanvas: () => {},
  setImageCanvasSelected: () => {},
  setCurrentTemplate: () => {},

  resetTextState: () => {},
  resetImagesState: () => {},
  resetScreensState: () => {},
  resetBackgroundActions: () => {},
  getCustomerTemplates: () => {},
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
  currentTemplate: PropTypes.shape(ITemplate),
  templatesOneScreen: PropTypes.arrayOf(ITemplate),
  templatesTwoScreen: PropTypes.arrayOf(ITemplate),
  templatesThreeScreen: PropTypes.arrayOf(ITemplate),
  // type: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // background: PropTypes.shape(IBackground),
  // gradientColorStart: PropTypes.shape(IBackground),
  // gradientColorEnd: PropTypes.shape(IBackground),
  thumbnail: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedModule: PropTypes.number,

  addImageCanvas: PropTypes.func,
  updateImageCanvas: PropTypes.func,
  removeImageCanvas: PropTypes.func,
  setSelectedText: PropTypes.func,
  setImageCanvasSelected: PropTypes.func,
  setSelectedModule: PropTypes.func,
  setCurrentTemplate: PropTypes.func,
  addText: PropTypes.func,
  deleteCustomerTemplate: PropTypes.func,

  resetTextState: PropTypes.func,
  resetImagesState: PropTypes.func,
  resetScreensState: PropTypes.func,
  resetBackgroundActions: PropTypes.func,
  getCustomerTemplates: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas)

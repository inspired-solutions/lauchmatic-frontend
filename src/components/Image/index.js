import React from 'react'
import './styles.scss'
import classNames from 'classnames'

import { connect } from 'react-redux'
import AppActions from '@redux/actions/AppActions'
import PropTypes from 'prop-types'
import ITemplate from '@interfaces/ITemplate'
import { useDrag } from 'react-dnd'
import IImage from '@interfaces/IImage'
// import ItemTypes from '@common/ItemTypes'

function Image({
  image,
  containerStyle,
  className,
  currentTemplate,
  setMenuMessage,
  messageOnAlert,
  menuOptionOnAlert,
  itemType,
  width,
  height,
}) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: itemType },
    canDrag: () => {
      return !!currentTemplate
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    begin: monitor => {
      console.log('entro a on drag')
      const offset = monitor.getSourceClientOffset()
      const { x, y } = monitor.getClientOffset()
      const itemPointDragged = {
        left: Number((x - offset.x).toFixed(2)),
        top: Number((y - offset.y).toFixed(2)),
      }
      return { type: itemType, image: { ...image, ...itemPointDragged } }
    },
  })

  const handleClick = () => {
    if (!currentTemplate) {
      setMenuMessage({
        menuOption: menuOptionOnAlert,
        message: messageOnAlert,
      })
    }
  }

  return (
    <div
      role="button"
      ref={drag}
      tabIndex={0}
      className={classNames(
        {
          [`c-image-container--is-dragging`]: isDragging,
        },
        'c-image-container',
        className
      )}
      style={{ ...containerStyle, width: width || 132, height: height || 132 }}
      onClick={handleClick}
      onKeyDown={() => {}}
      onDrag={handleClick}
    >
      <img src={image.url} alt="img" className="c-image" />
    </div>
  )
}

const mapStateToProps = state => ({
  menuMessage: state.app.menuMessage,
  currentTemplate: state.app.currentTemplate,
})
const mapDispatchToProps = {
  setMenuMessage: AppActions.setMenuMessage,
}

Image.defaultProps = {
  containerStyle: {},
  messageOnAlert: {},
  className: '',
}
Image.propTypes = {
  image: PropTypes.shape(IImage).isRequired,
  containerStyle: PropTypes.shape({}),
  className: PropTypes.string,
  menuOptionOnAlert: PropTypes.string.isRequired,
  messageOnAlert: PropTypes.shape({}),
  itemType: PropTypes.string.isRequired,
  currentTemplate: PropTypes.shape(ITemplate).isRequired,
  setMenuMessage: PropTypes.func.isRequired,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Image)

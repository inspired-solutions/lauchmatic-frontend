import React from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd'
import IImage from '@interfaces/IImage'

function ImageDevice({ device, itemType }) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: itemType },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    begin: monitor => {
      const offset = monitor.getSourceClientOffset()
      const { x, y } = monitor.getClientOffset()
      const itemPointDragged = {
        left: Number((x - offset.x).toFixed(2)),
        top: Number((y - offset.y).toFixed(2)),
      }
      return { type: itemType, image: { ...device, ...itemPointDragged } }
    },
  })

  return (
    <img
      ref={drag}
      src={device.url}
      alt={device.name}
      key={device.id}
      style={{
        marginTop: 8,
        width: 100,
        height: 200,
        objectFit: 'contain',
        border: '1px dashed  var(--color-grey-light)',
      }}
    />
  )
}

const mapStateToProps = state => ({
  currentTemplate: state.app.currentTemplate,
})
const mapDispatchToProps = {}

ImageDevice.defaultProps = {}
ImageDevice.propTypes = {
  device: PropTypes.shape(IImage).isRequired,
  itemType: PropTypes.string.isRequired,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageDevice)

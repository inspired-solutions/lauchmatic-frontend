import React from 'react'
import './styles.scss'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '@common/constants/ItemTypesConstant'
import { connect } from 'react-redux'

import ScreensActions from '@redux/actions/ScreensActions'

import PropTypes from 'prop-types'
import IDevice from '@interfaces/IDevice'

function Device({ device, addScreenCanvas, listScreensCanvas }) {
  const [, drop] = useDrop({
    accept: ItemTypes.SCREEN,
    drop: item => {
      addScreenCanvas({
        id: item.imageId,
        url: item.imageId,
        deviceId: device.id,
      })
    },
    canDrop: () => true,
  })

  const handleClick = e => {
    e.stopPropagation()
  }

  const screen = listScreensCanvas.find(mapScreen => mapScreen.deviceId === device.id)
  return (
    <div
      role="button"
      className="c-canvas-device"
      ref={drop}
      onClick={handleClick}
      onKeyDown={() => {}}
      style={device}
      tabIndex={0}
    >
      <img src={device.url} alt="" height="200" />
      {screen && (
        <img
          src={screen.url}
          alt=""
          height="180"
          style={{ width: '100%', objectFit: 'contain' }}
          key={screen.id}
          className="c-canvas-device__screen"
        />
      )}
    </div>
  )
}

Device.defaultProps = {}

const mapStateToProps = state => ({
  listScreensCanvas: state.screens.listScreensCanvas,
})

const mapStateDispatchToProps = {
  addScreenCanvas: ScreensActions.addScreenCanvas,
}

Device.propTypes = {
  device: PropTypes.shape(IDevice).isRequired,
  listScreensCanvas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  addScreenCanvas: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapStateDispatchToProps
)(Device)

/* eslint react/prop-types: 0 */ //

import React from 'react'
import { useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { ItemTypes } from '@common/constants/ItemTypesConstant'
import ScreensActions from '@redux/actions/ScreensActions'
////////////////////////////////////////////////////////////////////////////////////////////////////

function DeviceShallow({ device, addScreenCanvas, listScreensCanvas }) {
  const attachedScreen = listScreensCanvas.find(screen => screen.deviceId === device.id)
  const [, drop] = useDrop({
    accept: ItemTypes.SCREEN,
    drop: item => {
      console.log(item)
      console.log('entro a drop')
      addScreenCanvas({
        ...item.image,
        deviceId: device.id,
      })
    },
    canDrop: () => true,
  })
  return (
    <div
      ref={drop}
      style={{
        position: 'absolute',
        left: +(+device.x).toFixed(2),
        top: +(+device.y).toFixed(2),
        width: +(+device.width).toFixed(2),
        height: +(+device.height).toFixed(2),
        transform: `rotate(${(+device.rotation).toFixed(2)}deg)`,
        transformOrigin: 'top left',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        zIndex: 1004,
      }}
    >
      {attachedScreen && (
        <img
          src={attachedScreen.url}
          alt={device.id}
          style={{
            width: +(+device.width).toFixed(2),
            height: +(+device.height).toFixed(2),
            padding: 8,
            objectFit: 'cover',
          }}
        />
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  listScreensCanvas: state.screens.listScreensCanvas,
})

const mapDispatchToProps = {
  addScreenCanvas: ScreensActions.addScreenCanvas,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DeviceShallow)

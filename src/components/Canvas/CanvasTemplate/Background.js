import React from 'react'
import { Layer, Rect, Circle } from 'react-konva'
import PropTypes from 'prop-types'
import { COLOR_FILL_TYPE } from './../../../common/constants/BackgroundConstant'
import { getRgba } from './../../../common/helpers/ColorHelpers'
import BackgroundHelper from './../../../common/helpers/BackgroundHelper'

function Background({ width, height, template }) {

  const { background, type, gradientColorStart, gradientColorEnd } = template.background_color
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
  console.log(getBackgroundFromSelectedMode() || 'white')
  return (
    <Layer>
      {type === COLOR_FILL_TYPE.SOLID_FILL_ONE_COLOR && (
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={getBackgroundFromSelectedMode()}
          shadowBlur={10}
        />
      )}
      {type === COLOR_FILL_TYPE.GRADIENT_FILL_LINEAR && (
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fillLinearGradientStartPoint={{
            x: 0,
            y: height / 2,
          }}
          fillLinearGradientEndPoint={{
            x: width,
            y: height / 2,
          }}
          fillLinearGradientColorStops={[
            0,
            getRgba(gradientColorStart.value) || 'white',
            1,
            getRgba(gradientColorEnd.value) || 'white',
          ]}
          shadowBlur={10}
        />
      )}
      {type === COLOR_FILL_TYPE.GRADIENT_FILL_RADIAL && (
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fillRadialGradientStartPoint={{
            x: width / 2,
            y: height / 2,
          }}
          fillRadialGradientEndPoint={{
            x: 0,
            y: 0,
          }}
          fillRadialGradientStartRadius={0}
          fillRadialGradientEndRadius={width}
          fillRadialGradientColorStops={[
            0,
            getRgba(gradientColorStart.value) || 'white',
            1,
            getRgba(gradientColorEnd.value) || 'white',
          ]}
          shadowBlur={10}
        />
      )}
    </Layer>
  )
}
Background.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
}

export default Background

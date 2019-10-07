import React from 'react'
import './styles.scss'
import PropTypes from 'prop-types'

////////////////////////////////////////////////////////////////////////////////////////////////////

function SliderRange({ containerStyle }) {
  return (
    <div className="c-slider-range" id="range-slider" style={containerStyle}>
      <input type="range" name="" id="" className="c-slider-range-input" />
    </div>
  )
}
SliderRange.defaultProps = {
  containerStyle: {},
}
SliderRange.propTypes = {
  containerStyle: PropTypes.shape({}),
}
export default SliderRange

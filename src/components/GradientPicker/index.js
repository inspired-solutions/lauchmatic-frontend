import React from 'react'
import './styles.scss'
import classNames from 'classnames'
import { GRADIENT_COLOR_SELECTED } from './../../common/constants/BackgroundConstant'
import { connect } from 'react-redux'

import { getRgba } from './../../common/helpers/ColorHelpers'
import PropTypes from 'prop-types'
import BackgroundActions from './../../redux/actions/BackgroundActions'
import IBackground from './../../interfaces/IBackground'

function GradientPicker({
  containerStyle,
  gradientColorSelected,
  setGradientColorSelected,
  gradientColorEnd,
  gradientColorStart,
}) {
  const getGradientColor = (colorStart, colorEnd) => {
    return `linear-gradient(to right, ${getRgba(colorStart)}, ${getRgba(colorEnd)})`
  }

  const getColor = value => {
    const { hex, opacity } = value
    return getRgba({ hex, opacity })
  }

  return (
    <div className="c-gradient-picker" style={containerStyle}>
      <button
        type="button"
        className={classNames(
          {
            [`c-gradient-picker__color--selected`]:
              gradientColorSelected === GRADIENT_COLOR_SELECTED.START,
          },
          'c-gradient-picker__color-left'
        )}
        style={{ backgroundColor: getColor(gradientColorStart.value) }}
        onClick={() => {
          setGradientColorSelected(GRADIENT_COLOR_SELECTED.START)
        }}
      />
      <div
        className="c-gradient-picker__gradient-color"
        style={{ background: getGradientColor(gradientColorStart.value, gradientColorEnd.value) }}
      />
      <button
        type="button"
        className={classNames(
          {
            [`c-gradient-picker__color--selected`]:
              gradientColorSelected === GRADIENT_COLOR_SELECTED.END,
          },
          'c-gradient-picker__color-right'
        )}
        style={{ backgroundColor: getColor(gradientColorEnd.value) }}
        onClick={() => {
          setGradientColorSelected(GRADIENT_COLOR_SELECTED.END)
        }}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  gradientColorSelected: state.backgrounds.gradientColorSelected,
  // gradientColorStart: state.backgrounds.gradientColorStart,
  // gradientColorEnd: state.backgrounds.gradientColorEnd,
})

const mapDispatchToProps = {
  setGradientColorSelected: BackgroundActions.setGradientColorSelected,
}

GradientPicker.propTypes = {
  containerStyle: PropTypes.shape({}).isRequired,
  gradientColorSelected: PropTypes.shape(IBackground).isRequired,
  gradientColorStart: PropTypes.shape(IBackground).isRequired,
  gradientColorEnd: PropTypes.shape(IBackground).isRequired,
  setGradientColorSelected: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GradientPicker)

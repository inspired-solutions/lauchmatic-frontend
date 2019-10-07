import React from 'react'
import Typography from '../Typography'
import './styles.scss'
import { getRgba, getRgbaObject } from './../../common/helpers/ColorHelpers'
import { SketchPicker } from 'react-color'
import PropTypes from 'prop-types'

////////////////////////////////////////////////////////////////////////////////////////////////////

class ColorPicker extends React.Component {
  static defaultProps = {
    value: {
      hex: '',
      opacity: '',
    },
  }

  state = {
    openSketchPicker: false,
  }

  handleChange = name => e => {
    const { value, onChange } = this.props
    try {
      const color = { ...value }

      color[name] = e.target.value
      onChange(color)
    } catch (error) {
      console.log(error)
    }
  }

  handleChangeComplete = newColor => {
    const { value, onChange } = this.props
    try {
      const color = { ...value }
      color.hex = newColor.hex
      color.opacity = newColor.rgb.a.toFixed(2) * 100

      onChange(color)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { openSketchPicker } = this.state
    const {
      value: { hex, opacity },
    } = this.props
    return (
      <div className="c-color-picker">
        <div className="c-color-picker__children-container c-color-picker__color-container">
          <div
            role="button"
            onClick={() => {
              this.setState({ openSketchPicker: true })
            }}
            tabIndex={0}
            onKeyDown={() => {}}
            className="c-color-picker__children c-color-picker__color"
            style={{ backgroundColor: getRgba({ hex, opacity }) }}
          />
          {openSketchPicker && (
            <div
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
              className="c-color-picker__sketch-picker-container"
              onBlur={() => {
                this.setState({ openSketchPicker: false })
              }}
            >
              <SketchPicker
                onChangeComplete={this.handleChangeComplete}
                color={getRgbaObject({ hex, opacity })}
              />
            </div>
          )}
          <Typography variant="caption" color="text-primary">
            Color
          </Typography>
        </div>
        <div className="c-color-picker__children-container c-color-picker__hex-container">
          <input
            type="text"
            name=""
            id=""
            className="c-color-picker__children c-color-picker__hex"
            value={hex}
            onChange={this.handleChange('hex')}
          />
          <Typography variant="caption" color="text-primary">
            Hex
          </Typography>
        </div>
        <div className="c-color-picker__children-container c-color-picker__opacity-container">
          <input
            type="text"
            name=""
            id=""
            className="c-color-picker__children c-color-picker__opacity"
            onChange={this.handleChange('opacity')}
            value={opacity}
            maxLength={3}
          />
          <Typography variant="caption" color="text-primary">
            Opacity
          </Typography>
        </div>
      </div>
    )
  }
}

ColorPicker.propTypes = {
  value: PropTypes.shape({
    hex: PropTypes.string,
    opacity: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
}
export default ColorPicker

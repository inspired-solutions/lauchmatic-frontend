/* eslint jsx-a11y/click-events-have-key-events: 0 */ //
import React from 'react'
import Typography from '../Typography'
import './styles.scss'
import classNames from 'classnames'
import ExpandMoreIcon from '@svgs/expand_more.svg'
import Icon from '../Icon'
import PropTypes from 'prop-types'

class Select extends React.Component {
  state = {
    isOpen: false,
  }

  handleChange = value => e => {
    const { onChange } = this.props
    e.stopPropagation()
    onChange(value)
    this.handleClose(false)
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const {
      options,
      value,
      renderLabel,
      divider,
      optionsColor,
      renderOption,
      top,
      renderInput,
      inputHeight,
      containerStyle,
    } = this.props
    const { isOpen } = this.state
    return (
      <div
        className="c-select"
        onBlur={this.handleClose}
        style={containerStyle}
        role="presentation"
      >
        {renderLabel}
        <div
          className="c-select__input"
          onClick={this.handleOpen}
          style={{ height: inputHeight }}
          role="presentation"
        >
          {(() => {
            const option = options.find(itOption => itOption.value === value)

            return (
              (renderInput && renderInput(option)) ||
              (option && (
                <Typography
                  variant="body2"
                  weight="normal"
                  color="text-primary"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  {option.label}
                </Typography>
              )) ||
              null
            )
          })()}
          <Icon>
            <ExpandMoreIcon />
          </Icon>
        </div>
        {isOpen && (
          <div
            className="c-select__options-container"
            style={{ backgroundColor: `--var(--color-${optionsColor})`, top: `${top}px` }}
          >
            {options.map((option, index) =>
              renderOption ? (
                <div
                  key={option.value}
                  className="c-select__option c-select__option--odd"
                  onClick={this.handleChange(option.value)}
                  role="presentation"
                >
                  {renderOption(option)}
                </div>
              ) : (
                <div
                  className={classNames(
                    divider && index % 2 === 0 && 'c-select__option--odd',
                    'c-select__option'
                  )}
                  onClick={this.handleChange(option.value)}
                  key={option.value}
                  role="option"
                  tabIndex={0}
                  aria-selected={option.value === value}
                >
                  {option.label}
                  {(() => {
                    console.log(option.label)
                  })()}
                </div>
              )
            )}
          </div>
        )}
      </div>
    )
  }
}
Select.defaultProps = {
  containerStyle: {},
  renderLabel: null,
  divider: false,
  renderOption: null,
  renderInput: null,
  top: null,
  inputHeight: null,
}
Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  containerStyle: PropTypes.shape({}),
  renderLabel: PropTypes.node,
  divider: PropTypes.bool,
  optionsColor: PropTypes.oneOf([
    'primary',
    'secondary',
    'light',
    'dark',
    'info',
    'success',
    'success-light',
    'grey',
    'grey-light',
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  renderOption: PropTypes.func,
  renderInput: PropTypes.func,
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  inputHeight: PropTypes.number,
}
export default Select

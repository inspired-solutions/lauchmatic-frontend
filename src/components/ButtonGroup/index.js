import React from 'react'
import classNames from 'classnames'
import './styles.scss'
import Icon from '../Icon'
import Typography from '../Typography'
import PropTypes from 'prop-types'

////////////////////////////////////////////////////////////////////////////////////////////////////

function ButtonGroup({ options, value, onChange, style, full }) {
  const handleChange = newValue => () => {
    onChange(newValue)
  }

  return (
    <div className="c-button-group" style={style}>
      {options.map(option => (
        <button
          type="button"
          className={classNames(
            value === option.value && 'c-button-group__option--selected',
            full && 'c-button-group__option--full',
            'c-button-group__option'
          )}
          key={option.value}
          onClick={handleChange(option.value)}
        >
          {option.icon && <Icon>{option.icon}</Icon>}
          {option.label && (
            <Typography variant="body2" color="dark">
              {option.label}
            </Typography>
          )}
        </button>
      ))}
    </div>
  )
}

ButtonGroup.defaultProps = {
  style: {},
  full: false,
}
ButtonGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.any,
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
  full: PropTypes.bool,
}

export default ButtonGroup

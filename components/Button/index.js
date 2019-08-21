import React from 'react'
import './styles.scss'

import classNames from 'classnames'
import PropTypes from 'prop-types'

function Button({ children, variant, color, onClick, containerStyle, disabled }) {
  return (
    <button
      type="button"
      className={classNames(
        { [`c-button--disabled`]: disabled },
        `c-button--${variant}`,
        `c-button--${color}`,
        'c-button'
      )}
      onClick={onClick}
      style={containerStyle}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  variant: 'contained',
  onClick: () => {},
  containerStyle: {},
  disabled: false,
}

Button.propTypes = {
  variant: PropTypes.oneOf(['outlined', 'contained']),
  color: PropTypes.oneOf([
    'disabled',
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
  onClick: PropTypes.func,
  containerStyle: PropTypes.shape({}),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default Button

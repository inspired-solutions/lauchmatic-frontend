import React from 'react'
import classNames from 'classnames'
import './styles.scss'
import PropTypes from 'prop-types'

function Icon({ children, color, size, button }) {
  const Children = children

  return (
    <Children.type
      className={classNames(`c-icon--${color}`, `c-icon--${size}`, `c-icon`, {
        [`c-icon--button`]: button,
      })}
    />
  )
}
Icon.defaultProps = {
  color: 'dark',
  size: 'medium',
  button: false,
}

Icon.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'light',
    'dark',
    'info',
    'text-secondary',
    'success',
    'success-light',
  ]),
  button: PropTypes.bool,
  children: PropTypes.node.isRequired,
}
export default Icon

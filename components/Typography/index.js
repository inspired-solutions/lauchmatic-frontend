import React from 'react'
import './styles.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'

////////////////////////////////////////////////////////////////////////////////////////////////////

function Typography({ children, variant, weight, underline, muted, color, style }) {
  return (
    <span
      className={classNames(
        {
          [` c-typography--${variant}`]: true,
          [` c-typography--${weight}`]: true,
          [` c-typography--underline`]: underline,
          [` c-typography--muted`]: muted,
          [` c-typography--${color}`]: true,
        },
        'c-typography'
      )}
      style={style}
    >
      {children}
    </span>
  )
}

Typography.defaultProps = {
  variant: 'body1',
  weight: 'normal',
  color: 'default',
  underline: false,
  muted: false,
  style: {},
}

Typography.propTypes = {
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'button',
    'overline',
  ]),
  weight: PropTypes.oneOf(['light', 'normal', 'semi-bold', 'bold']),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'text-primary',
    'text-secondary',
    'light',
    'dark',
    'default',
  ]),
  underline: PropTypes.bool,
  muted: PropTypes.bool,
  style: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
}

export default Typography

import classNames from 'classnames'
import React from 'react'
import './styles.scss'
import PropTypes from 'prop-types'

////////////////////////////////////////////////////////////////////////////////////////////////////

function Paper({ children, elevation, onlyStyle, className, square }) {
  if (onlyStyle) {
    const childrenProps = children.props
    const clonedElementWithMoreProps = React.cloneElement(children, {
      ...childrenProps,
      className: classNames(
        childrenProps.className,
        {
          [` c-paper--square`]: square,
        },
        `c-paper--elevation-${elevation}`,
        `c-paper`,
        className
      ),
    })
    return clonedElementWithMoreProps
  }
  return (
    <div
      className={classNames(
        {
          [` c-paper--square`]: square,
        },
        `c-paper--elevation-${elevation}`,
        `c-paper`,
        className
      )}
    >
      {children}
    </div>
  )
}
Paper.defaultProps = {
  elevation: 1,
  onlyStyle: false,
  square: false,
  className: '',
}
Paper.propTypes = {
  elevation: PropTypes.oneOf([
    'none',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
  ]),
  onlyStyle: PropTypes.bool,
  square: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}
export default Paper

import React from 'react'
import './styles.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'

function MenuOptions({ children, hidden }) {
  return (
    <div
      className={classNames(
        {
          [`c-menu-options--hidden`]: hidden,
        },
        `c-menu-options`
      )}
    >
      {children}
    </div>
  )
}

MenuOptions.propTypes = {
  hidden: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}
export default MenuOptions

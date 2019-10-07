import React from 'react'
import './styles.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'

function MenuOptions({ children, hidden, admin }) {
  return (
    <div
      className={classNames(
        {
          [`c-menu-options--hidden`]: hidden,
          [`c-menu-options--admin`]: admin,
        },
        `c-menu-options`
      )}
    >
      {children}
    </div>
  )
}

MenuOptions.defaultProps = {
  admin: false,
  hidden: false,
}
MenuOptions.propTypes = {
  hidden: PropTypes.bool,
  children: PropTypes.node.isRequired,
  admin: PropTypes.bool,
}
export default MenuOptions

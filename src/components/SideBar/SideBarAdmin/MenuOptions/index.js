import React from 'react'
import './styles.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'

function MenuOptions({ children, hidden, admin }) {
  return (
    <div
      className={classNames(
        {
          [`c-menu-options--admin`]: admin,
        }
        // `c-menu-options`
      )}
      style={{
        overflowY: 'overlay',
        width: 'var(--menu-options-width)',
        height: 'calc(100vh)',
        backgroundColor: 'var(--color-background)',
        boxShadow: '6px 3px 8px rgba(0, 0, 0, 0.08)',
        zIndex: '1000',
      }}
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

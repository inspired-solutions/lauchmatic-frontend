import React from 'react'
// import SideBar from '../SideBar'
// import Header from '../Header'
import styles from './styles.scss'
import PropTypes from 'prop-types'

////////////////////////////////////////////////////////////////////////////////////////////////////

function Layout({ children }) {
  return (
    <div className="c-layout-container">
      <style jsx>{styles}</style>
      {/* <Header /> */}
      {/* <SideBar /> */}
      <div className="c-layout__main">{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

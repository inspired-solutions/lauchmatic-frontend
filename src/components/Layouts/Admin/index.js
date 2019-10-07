import React from 'react'
// import Header from '../../Header'
import './styles.scss'
import PropTypes from 'prop-types'
import SideBar from '../../../components/SideBar/SideBarAdmin'

function LayoutAdmin({ children }) {
  return (
    <div className="l-layout-admin__container admin">
      {/* < /> */}
      <SideBar />
      <div className="l-layout-admin__main">{children}</div>
    </div>
  )
}

LayoutAdmin.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutAdmin

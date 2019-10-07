import React from 'react'
import './styles.scss'
import TemplateIcon from '@svgs/template.svg'
import ScreensIcon from '@svgs/screens.svg'
import { connect } from 'react-redux'

import { SELECTED_MODULE } from '@common/constants/SelectedModuleConstant'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import DevicesMenuOptions from '@components/AdminPage/DevicesMenuOptions'
import TemplateMenuOptions from '@components/AdminPage/TemplateMenuOptions'
import TextMenuOptions from '@components/AdminPage/TextMenuOptions'
import MenuOptions from './MenuOptions'
import SideBarItem from '@components/SideBarItem'
import AdminAppAction from '@redux/actions/AdminAppActions'
import TextIcon from '@svgs/text.svg'

////////////////////////////////////////////////////////////////////////////////////////////////////

class SideBar extends React.Component {
  setSelectedModule = module => async () => {
    const { setSelectedModule, selectedModule } = this.props
    setSelectedModule(module === selectedModule ? SELECTED_MODULE.NONE : module)
  }

  render() {
    const { selectedModule, selectedText } = this.props
    const { TEMPLATES, DEVICES, TEXT } = SELECTED_MODULE
    return (
      <div
        // className="c-side-bar"
        style={{
          position: 'absolute',
          top: '0',
          marginTop: '0',
          display: 'flex',
          height: '100vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 'var(--side-bar-width)',
            borderRight: '1px solid var(--color-grey-light)',
          }}
        >
          <SideBarItem
            color="success-light"
            label="Templates"
            icon={<TemplateIcon />}
            selected={selectedModule === TEMPLATES}
            onSelectOption={this.setSelectedModule(TEMPLATES)}
            menuOption={TEMPLATES}
          />
          <SideBarItem
            color="primary"
            label="Devices"
            icon={<ScreensIcon />}
            selected={selectedModule === DEVICES}
            onSelectOption={this.setSelectedModule(DEVICES)}
            menuOption={DEVICES}
          />
          <SideBarItem
            color="secondary"
            label="Text"
            icon={<TextIcon />}
            selected={selectedModule === TEXT}
            onSelectOption={this.setSelectedModule(TEXT)}
            menuOption={TEXT}
          />
        </div>
        <MenuOptions admin>
          {selectedModule === DEVICES && <DevicesMenuOptions />}
          {selectedModule === TEMPLATES && <TemplateMenuOptions />}
          {selectedModule === TEXT && <TextMenuOptions />}
        </MenuOptions>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedModule: state.adminApp.selectedModule,
})

const mapDispatchToProps = {
  setSelectedModule: AdminAppAction.setSelectedModule,
}

SideBar.defaultProps = {
  selectedModule: 0,

  setSelectedModule: () => {},
}
SideBar.propTypes = {
  selectedModule: PropTypes.number,

  setSelectedModule: PropTypes.func,
}
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SideBar)

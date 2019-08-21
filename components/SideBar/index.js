import React from 'react'
import './styles.scss'
import TemplateIcon from '@svgs/template.svg'
import StarIcon from '@svgs/ammstar.svg'
import TextIcon from '@svgs/text.svg'
import ScreensIcon from '@svgs/screens.svg'
import BackgroundIcon from '@svgs/background.svg'
import SideBarItem from '../SideBarItem'
import { connect } from 'react-redux'

import { SELECTED_MODULE } from '@common/constants/SelectedModuleConstant'
import { compose } from 'recompose'
import MenuOptions from '../MenuOptions'
import ImagesMenuOptions from '../ImagesMenuOptions'
import TextMenuOptions from '../TextMenuOptions'
import BackgroundMenuOptions from '../BackgroundMenuOptions'
import ScreensMenuOptions from '../ScreensMenuOptions'
import TemplateMenuOptions from '../TemplateMenuOptions/index'
import AppActions from '@redux/actions/AppActions'
import PropTypes from 'prop-types'

////////////////////////////////////////////////////////////////////////////////////////////////////

class SideBar extends React.Component {
  setSelectedModule = module => async () => {
    const { setSelectedModule, selectedModule } = this.props
    setSelectedModule(module === selectedModule ? SELECTED_MODULE.NONE : module)
  }

  render() {
    const { selectedModule, selectedText } = this.props
    const { TEMPLATES, BACKGROUND, IMAGES, SCREENS, TEXT, NONE } = SELECTED_MODULE
    return (
      <div className="c-side-bar">
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
          label="Screens"
          icon={<ScreensIcon />}
          selected={selectedModule === SCREENS}
          onSelectOption={this.setSelectedModule(SCREENS)}
          menuOption={SCREENS}
        />
        <SideBarItem
          color="secondary"
          label="Text"
          icon={<TextIcon />}
          selected={selectedModule === TEXT}
          onSelectOption={this.setSelectedModule(TEXT)}
          menuOption={TEXT}
        />
        <SideBarItem
          color="info"
          label="Background"
          icon={<BackgroundIcon />}
          selected={selectedModule === BACKGROUND}
          onSelectOption={this.setSelectedModule(BACKGROUND)}
          menuOption={BACKGROUND}
        />
        <SideBarItem
          color="success"
          label="Images"
          icon={<StarIcon />}
          selected={selectedModule === IMAGES}
          onSelectOption={this.setSelectedModule(IMAGES)}
          menuOption={IMAGES}
        />
        <MenuOptions hidden={selectedModule === NONE}>
          {selectedModule === IMAGES && <ImagesMenuOptions />}
          {selectedModule === TEXT && <TextMenuOptions />}
          {selectedModule === BACKGROUND && <BackgroundMenuOptions />}
          {selectedModule === SCREENS && <ScreensMenuOptions />}
          {selectedModule === TEMPLATES && <TemplateMenuOptions />}
        </MenuOptions>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedModule: state.app.selectedModule,
  selectedText: state.texts.selectedText,
})

const mapDispatchToProps = {
  setSelectedModule: AppActions.setSelectedModule,
}

SideBar.defaultProps = {
  selectedModule: 0,
  selectedText: '',

  setSelectedModule: () => {},
}
SideBar.propTypes = {
  selectedModule: PropTypes.number,
  selectedText: PropTypes.string,

  setSelectedModule: PropTypes.func,
}
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SideBar)

import React from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Select from '../Select'
import { SCREENS_DEVICES, SCREENS_TYPE } from '@common/constants/ScreensConstant'
import Icon from '../Icon'
import DeviceIcon from '@svgs/device.svg'
import ButtonGroup from '../ButtonGroup'
import ITemplate from '@interfaces/ITemplate'
import PropTypes from 'prop-types'
import { TEMPLATE_TYPES } from '@common/constants/TemplateConstant'
import AppActions from '@redux/actions/AppActions'
import TemplateAction from '@redux/actions/TemplateAction'

const generateDevice = (id, url) => {
  return { url, id }
}

const FAKE_TEMPLATES_ONE_SCREEN = [
  {
    id: 1,
    devices: [generateDevice(1, 'static/images/1 screen/1/6c_fitted.png')],
  },
]

const FAKE_TEMPLATES_TWO_SCREEN = [
  // {
  //   id: 2,
  //   devices: [
  //     generateDevice(
  //       2,
  //       14,
  //       14,
  //       'rotate(47deg) translate(0px, -1px) skew(19deg, -29deg) scale(1.4)',
  //       '/static/images/iphone.png'
  //     ),
  //   ],
  // },
]

const FAKE_TEMPLATES_THREE_SCREEN = [
  // {
  //   id: 3,
  //   devices: [
  //     generateDevice(
  //       3,
  //       14,
  //       14,
  //       'rotate(47deg) translate(0px, -1px) skew(19deg, -29deg) scale(1.4)',
  //       '/static/images/iphone.png'
  //     ),
  //     generateDevice(
  //       4,
  //       14,
  //       14,
  //       'rotate(26deg) translate(0px, -1px) skew(27deg, -25deg) scale(1.2)',
  //       '/static/images/iphone.png'
  //     ),
  //   ],
  // },
]

class TemplateMenuOptions extends React.Component {
  state = {
    currentTab: SCREENS_TYPE[0].label,
  }

  componentDidMount() {
    const { loadTemplateOneScreen, loadTemplateThreeScreen, loadTemplateTwoScreen } = this.props
    loadTemplateOneScreen(FAKE_TEMPLATES_ONE_SCREEN)
    loadTemplateTwoScreen(FAKE_TEMPLATES_TWO_SCREEN)
    loadTemplateThreeScreen(FAKE_TEMPLATES_THREE_SCREEN)
  }

  handleChangeTab = value => {
    this.setState({
      currentTab: value,
    })
  }

  handleSelectTemplate = (template, type) => () => {
    const { setCurrentTemplate } = this.props
    setCurrentTemplate({ ...template, type })
  }

  render() {
    const { currentTab } = this.state
    const { templatesOneScreen, templatesTwoScreen, templatesThreeScreen } = this.props

    return (
      <div className="c-template-menu-options">
        <div className="c-template-menu-options__header">
          <div className="c-template-menu-options__header-select-container">
            <Icon size="large">
              <DeviceIcon />
            </Icon>
            <Select
              options={[SCREENS_DEVICES[0]]}
              value={0}
              optionsColor="grey-light"
              onChange={() => {}}
              top={41}
            />
          </div>
          <ButtonGroup
            options={SCREENS_TYPE}
            value={currentTab}
            onChange={this.handleChangeTab}
            full
            style={{ marginTop: 18 }}
          />
        </div>
        <div className="c-template-menu-options__content">
          {currentTab === SCREENS_TYPE[0].label &&
            templatesThreeScreen.map(template => (
              <div
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                className="c-template-menu-options__content-template-three-screen"
                onClick={this.handleSelectTemplate(template, TEMPLATE_TYPES.THREE_SCREEN)}
                key={template.id}
              >
                {template.devices.map(device => (
                  <img src={device.url} alt="" height="90" style={device} key={device.id} />
                ))}
              </div>
            ))}
          {currentTab === SCREENS_TYPE[1].label &&
            templatesTwoScreen.map(template => (
              <div
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                className="c-template-menu-options__content-template-two-screen"
                onClick={this.handleSelectTemplate(template, TEMPLATE_TYPES.TWO_SCREEN)}
                key={template.id}
              >
                {template.devices.map(device => (
                  <img src={device.url} alt="" height="90" style={device} key={device.id} />
                ))}
              </div>
            ))}
          {currentTab === SCREENS_TYPE[2].label &&
            templatesOneScreen.map(template => (
              <div
                role="button"
                onKeyDown={() => {}}
                tabIndex={0}
                className="c-template-menu-options__content-template-one-screen"
                onClick={this.handleSelectTemplate(template, TEMPLATE_TYPES.ONE_SCREEN)}
                key={template.id}
              >
                {template.devices.map(device => (
                  <img src={device.url} alt="" height="90" style={device} key={device.id} />
                ))}
              </div>
            ))}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  templatesOneScreen: state.template.templatesOneScreen,
  templatesTwoScreen: state.template.templatesTwoScreen,
  templatesThreeScreen: state.template.templatesThreeScreen,
})

const mapDispatchToProps = {
  setCurrentTemplate: AppActions.setCurrentTemplate,
  loadTemplateOneScreen: TemplateAction.loadTemplateOneScreen,
  loadTemplateTwoScreen: TemplateAction.loadTemplateTwoScreen,
  loadTemplateThreeScreen: TemplateAction.loadTemplateThreeScreen,
}

TemplateMenuOptions.defaultProps = {
  templatesOneScreen: [],
  templatesTwoScreen: [],
  templatesThreeScreen: [],

  setCurrentTemplate: () => {},
  loadTemplateOneScreen: () => {},
  loadTemplateTwoScreen: () => {},
  loadTemplateThreeScreen: () => {},
}
TemplateMenuOptions.propTypes = {
  templatesOneScreen: PropTypes.arrayOf(PropTypes.shape(ITemplate)),
  templatesTwoScreen: PropTypes.arrayOf(PropTypes.arrayOf(ITemplate)),
  templatesThreeScreen: PropTypes.arrayOf(PropTypes.arrayOf(ITemplate)),

  setCurrentTemplate: PropTypes.func,
  loadTemplateOneScreen: PropTypes.func,
  loadTemplateTwoScreen: PropTypes.func,
  loadTemplateThreeScreen: PropTypes.func,
}
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TemplateMenuOptions)

import React from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { SCREENS_TYPE } from './../../../common/constants/ScreensConstant'
import { ReactComponent as DeviceIcon } from "./../../../svgs/device.svg";
import ITemplate from './../../../interfaces/ITemplate'
import PropTypes from 'prop-types'
import AppActions from './../../../redux/actions/AppActions'
import Select from './../../Select'
import ButtonGroup from './../../ButtonGroup'
import Icon from './../../Icon'
import Typography from './../../Typography'
import { Stage, Layer } from 'react-konva'
import ImageCanvas from './ImageCanvas'
import TextCanvas from './TextCanvas'
import AdminTemplateAction from './../../../redux/actions/AdminTemplatesActions'
import templateService from './../../../services/template.service'
import Button from "react-bootstrap/Button";
class TemplateMenuOptions extends React.Component {
  state = {
    currentTab: SCREENS_TYPE[0].value,
    deviceThumbnailId: '',
  }

  componentDidMount() {
    const { getAdminTemplates } = this.props
    getAdminTemplates()
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

  handleDeleteAdminTemplate = template => async () => {
    console.log('entro')
    const { getAdminTemplates } = this.props
    try {
      const response = await templateService.deleteTemplate(template.id)
      if (response.message) {
        alert('Could not remove the template, probably already have created customer from it')
        return
      }
      await getAdminTemplates()
      alert('Template deleted')
    } catch (error) {
      alert('Could not remove the template, probably already have created customer from it')
      console.log(error)
    }
  }

  setDeviceThumbnailId = deviceThumbnailId => {
    this.setState({ deviceThumbnailId })
  }

  getWidth = numberScreens => {
    switch (numberScreens) {
      case 3:
        return 312
      case 2:
        return 206
      default:
        return 100
    }
  }

  getProportion = numberScreens => {
    switch (numberScreens) {
      case 3:
        return Number((312 / 836).toFixed(2))
      case 2:
        return Number((206 / 552).toFixed(2))

      default:
        return Number((100 / 268).toFixed(2))
    }
  }

  getProportionHeight = () => {
    return Number((180 / 478).toFixed(2))
  }

  render() {
    const { currentTab, deviceThumbnailId } = this.state
    const {
      templatesOneScreen,
      templatesTwoScreen,
      templatesThreeScreen,
      deviceThumbnails,
    } = this.props
    console.log(templatesOneScreen)
    console.log(deviceThumbnailId)
    return (
      <div className="c-template-menu-options">
        <div className="c-template-menu-options__header">
          <div className="c-template-menu-options__header-select-container">
            <Icon size="large">
              <DeviceIcon />
            </Icon>
            <Select
              options={[
                {
                  label: "Select device",
                  value: "",
                  icon:
                    "https://storage.googleapis.com/test-template-47607.appspot.com/thumbnailDevices/57wCc7s16xKe549ER7tl.svg"
                },
                ...deviceThumbnails.map(device => ({
                  label: device.name,
                  value: device.id,
                  icon: device.image
                }))
              ]}
              renderInput={option => {
                return (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={option.icon}
                      alt={option.url}
                      style={{
                        width: 24,
                        height: 24,
                        objectFit: "contain",
                        marginRight: 8
                      }}
                    />
                    <Typography variant="caption">{option.label}</Typography>
                  </div>
                );
              }}
              renderOption={option => {
                return (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={option.icon}
                      alt={option.url}
                      style={{
                        width: 24,
                        height: 24,
                        objectFit: "contain",
                        marginRight: 8
                      }}
                    />
                    <Typography variant="caption">{option.label}</Typography>
                  </div>
                );
              }}
              value={deviceThumbnailId}
              optionsColor="grey-light"
              onChange={this.setDeviceThumbnailId}
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
          {currentTab === SCREENS_TYPE[0].value &&
            templatesThreeScreen
              .filter(template => template.thumbnail.id === deviceThumbnailId)
              .map(template => (
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                  style={{
                    marginTop: 8,
                    position: "relative",
                    width: this.getWidth(3),
                    height: 180,
                    backgroundColor: "white"
                  }}
                  key={template.id}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      zIndex: 2004
                    }}
                  >
                    <Button
                      onClick={this.handleDeleteAdminTemplate(template)}
                      variant="light"
                    >
                      X
                    </Button>
                  </div>
                  <Stage width={this.getWidth(3)} height={180}>
                    <Layer>
                      {template.devices.map(device => {
                        return (
                          <ImageCanvas
                            key={device.id}
                            image={device.image}
                            x={device.x * this.getProportion(3)}
                            y={device.y * this.getProportionHeight()}
                            width={device.width * this.getProportion(3)}
                            height={device.height * this.getProportionHeight()}
                            rotation={device.rotation}
                          />
                        );
                      })}
                    </Layer>
                    <Layer>
                      {template.texts_list.map(text => {
                        return (
                          <TextCanvas
                            key={text.id}
                            value={text.value}
                            x={text.x * this.getProportion(3)}
                            y={text.y * this.getProportionHeight()}
                            width={text.width * this.getProportion(3)}
                            height={text.height * this.getProportionHeight()}
                            rotation={text.rotation}
                          />
                        );
                      })}
                    </Layer>
                  </Stage>
                </div>
              ))}
          {currentTab === SCREENS_TYPE[1].value &&
            templatesTwoScreen
              .filter(template => template.thumbnail.id === deviceThumbnailId)
              .map(template => (
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                  style={{
                    marginTop: 8,
                    position: "relative",
                    width: this.getWidth(2),
                    height: 180,
                    backgroundColor: "white"
                  }}
                  key={template.id}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      zIndex: 2004
                    }}
                  >
                    <Button
                      onClick={this.handleDeleteAdminTemplate(template)}
                      variant="light"
                    >
                      X
                    </Button>
                  </div>
                  <Stage width={this.getWidth(2)} height={180}>
                    <Layer>
                      {template.devices.map(device => {
                        return (
                          <ImageCanvas
                            key={device.id}
                            image={device.image}
                            x={device.x * this.getProportion(2)}
                            y={device.y * this.getProportionHeight()}
                            width={device.width * this.getProportion(2)}
                            height={device.height * this.getProportionHeight()}
                            rotation={device.rotation}
                          />
                        );
                      })}
                    </Layer>
                    <Layer>
                      {template.texts_list.map(text => {
                        return (
                          <TextCanvas
                            key={text.id}
                            value={text.value}
                            x={text.x * this.getProportion(2)}
                            y={text.y * this.getProportionHeight()}
                            width={text.width * this.getProportion(2)}
                            height={text.height * this.getProportionHeight()}
                            rotation={text.rotation}
                          />
                        );
                      })}
                    </Layer>
                  </Stage>
                </div>
              ))}
          {currentTab === SCREENS_TYPE[2].value &&
            templatesOneScreen
              .filter(template => template.thumbnail.id === deviceThumbnailId)
              .map(template => (
                <div
                  role="button"
                  onKeyDown={() => {}}
                  tabIndex={0}
                  style={{
                    marginTop: 8,
                    position: "relative",
                    width: this.getWidth(1),
                    height: 180,
                    backgroundColor: "white"
                  }}
                  key={template.id}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      zIndex: 2004
                    }}
                  >
                    <Button
                      onClick={this.handleDeleteAdminTemplate(template)}
                      variant="light"
                    >
                      X
                    </Button>
                  </div>
                  <Stage width={this.getWidth(1)} height={180}>
                    <Layer>
                      {template.devices.map(device => {
                        return (
                          <TextCanvas
                            key={device.id}
                            image={device.image}
                            x={device.x * this.getProportion(1)}
                            y={device.y * this.getProportionHeight()}
                            width={device.width * this.getProportion(1)}
                            height={device.height * this.getProportionHeight()}
                            rotation={device.rotation}
                            // scaleX={device.scaleX}
                            // scaleY={device.scaleY}
                            // skewX={device.skewX}
                            // skewY={device.skewY}
                          />
                        );
                      })}
                    </Layer>
                    <Layer>
                      {template.texts_list.map(text => {
                        return (
                          <TextCanvas
                            key={text.id}
                            value={text.value}
                            x={text.x * this.getProportion(1)}
                            y={text.y * this.getProportionHeight()}
                            width={text.width * this.getProportion(1)}
                            height={text.height * this.getProportionHeight()}
                            rotation={text.rotation}
                          />
                        );
                      })}
                    </Layer>
                  </Stage>
                </div>
              ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  templatesOneScreen: state.adminTemplate.templatesOneScreen,
  templatesTwoScreen: state.adminTemplate.templatesTwoScreen,
  templatesThreeScreen: state.adminTemplate.templatesThreeScreen,
  deviceThumbnails: state.adminDeviceThumbnail.list,
})

const mapDispatchToProps = {
  setCurrentTemplate: AppActions.setCurrentTemplate,
  getAdminTemplates: AdminTemplateAction.getAdminTemplates,
}

TemplateMenuOptions.defaultProps = {
  templatesOneScreen: [],
  templatesTwoScreen: [],
  templatesThreeScreen: [],
  deviceThumbnails: [],

  setCurrentTemplate: () => {},
  getAdminTemplates: () => {},
}
TemplateMenuOptions.propTypes = {
  templatesOneScreen: PropTypes.arrayOf(PropTypes.shape(ITemplate)),
  templatesTwoScreen: PropTypes.arrayOf(PropTypes.arrayOf(ITemplate)),
  templatesThreeScreen: PropTypes.arrayOf(PropTypes.arrayOf(ITemplate)),

  deviceThumbnails: PropTypes.arrayOf(PropTypes.shape({})),
  setCurrentTemplate: PropTypes.func,

  getAdminTemplates: PropTypes.func,
}
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TemplateMenuOptions)

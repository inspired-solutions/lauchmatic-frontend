import React from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Select from '../Select'
import { SCREENS_TYPE } from '@common/constants/ScreensConstant'
import Icon from '../Icon'
import DeviceIcon from '@svgs/device.svg'
import ButtonGroup from '../ButtonGroup'
import ITemplate from '@interfaces/ITemplate'
import PropTypes from 'prop-types'
import { TEMPLATE_TYPES } from '@common/constants/TemplateConstant'
import AppActions from '@redux/actions/AppActions'
import Typography from '@components/Typography'
import { Stage, Layer } from 'react-konva'
import ImageCanvas from './ImageCanvas'
import AdminDeviceThumbnailAction from '@redux/actions/AdminDeviceThumbnailAction'
import AdminTemplateAction from '@redux/actions/AdminTemplatesActions'
import TemplateAction from '@redux/actions/TemplateAction'
import templateService from '@services/template.service'
import TextCanvas from './TextCanvas'

class TemplateMenuOptions extends React.Component {
  state = {
    currentTab: SCREENS_TYPE[0].label,
  }

  componentDidMount() {
    const { getDeviceThumbnails } = this.props
    getDeviceThumbnails()
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

  handleCreateCustomerTemplate = template => async () => {
    const { addTemplate, getCustomerTemplates } = this.props
    try {
      await addTemplate({
        template_id: template.id,
      })
      await getCustomerTemplates()
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { currentTab } = this.state
    const {
      templatesOneScreen,
      templatesTwoScreen,
      templatesThreeScreen,
      deviceThumbnails,
      setCurrentTemplate,
      thumbnail,
      setThumbnail,
    } = this.props

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
                  label: 'Select device',
                  value: '',
                  icon:
                    'https://storage.googleapis.com/test-template-47607.appspot.com/thumbnailDevices/57wCc7s16xKe549ER7tl.svg',
                },
                ...deviceThumbnails.map(device => ({
                  label: device.name,
                  value: device.id,
                  icon: device.image,
                })),
              ]}
              renderInput={option => {
                return (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={option.icon}
                      alt={option.name}
                      style={{
                        width: 24,
                        height: 24,
                        objectFit: 'contain',
                        marginRight: 8,
                      }}
                    />
                    <Typography variant="caption">{option.label}</Typography>
                  </div>
                )
              }}
              renderOption={option => {
                return (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={option.icon}
                      alt={option.name}
                      style={{
                        width: 24,
                        height: 24,
                        objectFit: 'contain',
                        marginRight: 8,
                      }}
                    />
                    <Typography variant="caption">{option.label}</Typography>
                  </div>
                )
              }}
              value={thumbnail}
              optionsColor="grey-light"
              onChange={setThumbnail}
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
              .filter(template => template.thumbnail.id === thumbnail)
              .map(template => (
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                  // className="c-template-menu-options__content-template-three-screen"
                  // onClick={this.handleSelectTemplate(template, TEMPLATE_TYPES.THREE_SCREEN)}
                  style={{
                    marginTop: 8,
                    position: 'relative',
                    width: this.getWidth(3),
                    height: 180,
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    border: '1px solid blue',
                  }}
                  key={template.id}
                >
                  <Stage
                    width={this.getWidth(3)}
                    height={180}
                    onClick={this.handleCreateCustomerTemplate(template)}
                  >
                    <Layer>
                      {template.devices.map(device => {
                        return (
                          <ImageCanvas
                            image={device.image}
                            x={device.x * this.getProportion(3)}
                            y={device.y * this.getProportionHeight()}
                            width={device.width * this.getProportion(3)}
                            height={device.height * this.getProportionHeight()}
                            rotation={device.rotation}
                          />
                        )
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
                        )
                      })}
                    </Layer>
                  </Stage>
                </div>
              ))}
          {currentTab === SCREENS_TYPE[1].value &&
            templatesTwoScreen
              .filter(template => template.thumbnail.id === thumbnail)
              .map(template => (
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                  // className="c-template-menu-options__content-template-two-screen"
                  // onClick={this.handleSelectTemplate(template, TEMPLATE_TYPES.TWO_SCREEN)}
                  style={{
                    marginTop: 8,
                    position: 'relative',
                    width: this.getWidth(2),
                    height: 180,
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    border: '1px solid blue',
                  }}
                  key={template.id}
                >
                  <Stage
                    width={this.getWidth(2)}
                    height={180}
                    onClick={this.handleCreateCustomerTemplate(template)}
                  >
                    <Layer>
                      {template.devices.map(device => {
                        return (
                          <ImageCanvas
                            image={device.image}
                            x={device.x * this.getProportion(2)}
                            y={device.y * this.getProportionHeight()}
                            width={device.width * this.getProportion(2)}
                            height={device.height * this.getProportionHeight()}
                            rotation={device.rotation}
                          />
                        )
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
                        )
                      })}
                    </Layer>
                  </Stage>
                </div>
              ))}
          {currentTab === SCREENS_TYPE[2].value &&
            templatesOneScreen
              .filter(template => template.thumbnail.id === thumbnail)
              .map(template => (
                <div
                  role="button"
                  onKeyDown={() => {}}
                  tabIndex={0}
                  // className="c-template-menu-options__content-template-one-screen"
                  // onClick={this.handleSelectTemplate(template, TEMPLATE_TYPES.ONE_SCREEN)}
                  style={{
                    marginTop: 8,
                    position: 'relative',
                    width: this.getWidth(1),
                    height: 180,
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    border: '1px solid blue',
                  }}
                  key={template.id}
                >
                  <Stage
                    width={this.getWidth(1)}
                    height={180}
                    onClick={this.handleCreateCustomerTemplate(template)}
                  >
                    <Layer>
                      {template.devices.map(device => {
                        return (
                          <ImageCanvas
                            image={device.image}
                            x={device.x * this.getProportion(1)}
                            y={device.y * this.getProportionHeight()}
                            width={device.width * this.getProportion(1)}
                            height={device.height * this.getProportionHeight()}
                            rotation={device.rotation}
                          />
                        )
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
                        )
                      })}
                    </Layer>
                  </Stage>
                </div>
              ))}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  templatesOneScreen: state.adminTemplate.templatesOneScreen,
  templatesTwoScreen: state.adminTemplate.templatesTwoScreen,
  templatesThreeScreen: state.adminTemplate.templatesThreeScreen,
  deviceThumbnails: state.adminDeviceThumbnail.list,
  thumbnail: state.app.thumbnail,
})

const mapDispatchToProps = {
  setCurrentTemplate: AppActions.setCurrentTemplate,
  getAdminTemplates: AdminTemplateAction.getAdminTemplates,
  getCustomerTemplates: TemplateAction.getCustomerTemplates,
  getDeviceThumbnails: AdminDeviceThumbnailAction.getDeviceThumbnails,
  addTemplate: TemplateAction.addTemplate,
  setThumbnail: AppActions.setThumbnail,
}

TemplateMenuOptions.defaultProps = {
  templatesOneScreen: [],
  templatesTwoScreen: [],
  templatesThreeScreen: [],
  thumbnail: [],

  setCurrentTemplate: () => {},
  getDeviceThumbnails: () => {},
  deviceThumbnails: [],
  getAdminTemplates: () => {},
  getCustomerTemplates: () => {},
  addTemplate: () => {},
  setThumbnail: () => {},
}
TemplateMenuOptions.propTypes = {
  templatesOneScreen: PropTypes.arrayOf(PropTypes.shape(ITemplate)),
  templatesTwoScreen: PropTypes.arrayOf(PropTypes.arrayOf(ITemplate)),
  templatesThreeScreen: PropTypes.arrayOf(PropTypes.arrayOf(ITemplate)),
  thumbnail: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  setCurrentTemplate: PropTypes.func,
  getDeviceThumbnails: PropTypes.func,
  deviceThumbnails: PropTypes.arrayOf(PropTypes.shape({})),
  getAdminTemplates: PropTypes.func,
  getCustomerTemplates: PropTypes.func,
  addTemplate: PropTypes.func,
  setThumbnail: PropTypes.func,
}
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TemplateMenuOptions)

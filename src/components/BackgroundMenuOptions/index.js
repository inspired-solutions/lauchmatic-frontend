import './styles.scss'

import {
  COLOR_FILL,
  COLOR_FILL_TYPE,
  GRADIENT_COLOR_SELECTED,
} from '@common/constants/BackgroundConstant'
import { SELECTED_MODULE } from '@common/constants/SelectedModuleConstant'
import BackgroundHelper from '@common/helpers/BackgroundHelper'

import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import Button from '../Button'
import ColorPicker from '../ColorPicker'
import GradientPicker from '../GradientPicker'
import Icon from '../Icon'
import Select from '../Select'
import Typography from '../Typography'
import ColorInvertIcon from '@svgs/color_invert.svg'
import BackgroundActions from '@redux/actions/BackgroundActions'
import AppActions from '@redux/actions/AppActions'
import PropTypes from 'prop-types'
import IBackground from '@interfaces/IBackground'
import ITemplate from '@interfaces/ITemplate'

////////////////////////////////////////////////////////////////////////////////////////////////////

class BackgroundMenuOptions extends React.Component {
  async componentDidMount() {
    const { getAllBackgrounds } = this.props
    await getAllBackgrounds()
  }

  handleCheckTemplate = e => {
    const { currentTemplate, setMenuMessage } = this.props
    if (!currentTemplate) {
      setMenuMessage({
        menuOption: SELECTED_MODULE.TEMPLATES,
        message: 'You need to add a template first!',
      })
      e.stopPropagation()
    }
  }

  loadImage = event => {
    const { setBackground } = this.props
    try {
      const reader = new FileReader()
      reader.onload = e => {
        setBackground({
          id: e.target.result,
          value: {
            imageUrl: `url("${e.target.result}")`,
          },
        })
      }
      reader.readAsDataURL(event.target.files[0])
    } catch (error) {
      console.log(error)
    }
  }

  handleChangeColor = async backgroundValue => {
    const {
      type,
      setBackground,
      setGradientColorEnd,
      setGradientColorStart,
      gradientColorSelected,
      background,
    } = this.props
    if (type === COLOR_FILL_TYPE.SOLID_FILL_ONE_COLOR) {
      await setBackground({ id: background.id, value: backgroundValue })
      return
    }
    if (gradientColorSelected === GRADIENT_COLOR_SELECTED.START) {
      setGradientColorStart({ id: background.id, value: backgroundValue })
      return
    }
    setGradientColorEnd({ id: background.id, value: backgroundValue })
  }

  getCurrentColorFromModeSelected = () => {
    const {
      type,
      gradientColorEnd,
      gradientColorSelected,
      gradientColorStart,
      background,
    } = this.props
    if (type === COLOR_FILL_TYPE.SOLID_FILL_ONE_COLOR) {
      return background.value
    }
    if (gradientColorSelected === GRADIENT_COLOR_SELECTED.START) {
      return gradientColorStart.value
    }
    return gradientColorEnd.value
  }

  render() {
    const { backgrounds, type, setType } = this.props
    return (
      <div
        role="button"
        tabIndex={0}
        className="c-background-menu-options"
        onMouseDown={this.handleCheckTemplate}
      >
        <div className="c-background-menu-options__header">
          <div className="c-background-menu-options__header-label">
            <Typography weight="semi-bold" color="text-secondary" variant="body2">
              Select an image
            </Typography>
            <Typography muted variant="body2">
              From your computer
            </Typography>
          </div>
          <input
            type="file"
            ref={ref => {
              this.inputFile = ref
            }}
            style={{ display: 'none' }}
            onChange={this.loadImage}
          />
          <Button
            color="info"
            variant="outlined"
            onClick={() => {
              this.inputFile.click()
              console.log('entro')
            }}
          >
            <Typography weight="semi-bold">Import</Typography>
          </Button>
        </div>
        <div className="c-background-menu-options__content">
          <div className="c-background-menu-options__content-header">
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              <Icon size="large">
                <ColorInvertIcon />
              </Icon>
              <Select
                value={type}
                optionsColor="light"
                options={COLOR_FILL}
                onChange={value => {
                  setType(value)
                }}
                top="41"
                renderOption={option => (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">{option.primary}</Typography>
                    <Typography variant="body2" muted>
                      {option.secondary}
                    </Typography>
                  </div>
                )}
                renderInput={option => (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body2">{option.primary}</Typography>
                    <Typography variant="body2" muted>
                      {option.secondary}
                    </Typography>
                  </div>
                )}
              />
            </div>
            {type !== COLOR_FILL_TYPE.SOLID_FILL_ONE_COLOR && (
              <GradientPicker containerStyle={{ margin: '16px 0px 0px', width: 295 }} />
            )}
            <div style={{ width: '100%', marginTop: 18 }}>
              <ColorPicker
                // value={background.value}
                value={this.getCurrentColorFromModeSelected()}
                onChange={this.handleChangeColor}
              />
            </div>
          </div>
        </div>
        <div className="c-background-menu-options__content-gallery">
          <Typography variant="body2" weight="semi-bold">
            Predetermined
          </Typography>
          <div className="c-background-menu-options__content-gallery__color-container">
            {backgrounds.map(background => (
              <div
                role="button"
                tabIndex={0}
                key={background.id}
                className="c-background-menu-options__content-gallery__color"
                style={{ backgroundColor: BackgroundHelper.getBackgroundColor(background.value) }}
                onMouseDown={() => {
                  this.handleChangeColor(background.value)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  backgrounds: state.backgrounds.list,
  background: state.backgrounds.background,
  type: state.backgrounds.type,
  gradientColorSelected: state.backgrounds.gradientColorSelected,
  gradientColorStart: state.backgrounds.gradientColorStart,
  gradientColorEnd: state.backgrounds.gradientColorEnd,

  currentTemplate: state.app.currentTemplate,
})

const mapDispatchToprops = {
  setBackground: BackgroundActions.setBackground,
  getAllBackgrounds: BackgroundActions.getAll,
  setType: BackgroundActions.setType,

  setGradientColorStart: BackgroundActions.setGradientColorStart,
  setGradientColorEnd: BackgroundActions.setGradientColorEnd,
  setMenuMessage: AppActions.setMenuMessage,
}

BackgroundMenuOptions.propTypes = {
  backgrounds: PropTypes.arrayOf(PropTypes.shape(IBackground)).isRequired,
  background: PropTypes.shape(IBackground).isRequired,
  type: PropTypes.string.isRequired,
  gradientColorSelected: PropTypes.shape(IBackground).isRequired,
  gradientColorStart: PropTypes.shape(IBackground).isRequired,
  gradientColorEnd: PropTypes.shape(IBackground).isRequired,

  currentTemplate: PropTypes.shape(ITemplate).isRequired,

  setBackground: PropTypes.func.isRequired,
  getAllBackgrounds: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,

  setGradientColorStart: PropTypes.func.isRequired,
  setGradientColorEnd: PropTypes.func.isRequired,
  setMenuMessage: PropTypes.func.isRequired,
}
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToprops
  )
)(BackgroundMenuOptions)

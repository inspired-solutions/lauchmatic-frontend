import React from 'react'
import Typography from '../Typography'
import Button from '../Button'
import './styles.scss'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import Image from '../Image/index'
import { SELECTED_MODULE } from '@common/constants/SelectedModuleConstant'
import { ItemTypes } from '@common/constants/ItemTypesConstant'
import ScreensActions from '@redux/actions/ScreensActions'
import PropTypes from 'prop-types'

class ScreensMenuOptions extends React.Component {
  loadImage = event => {
    const { addScreenMenu } = this.props
    try {
      const reader = new FileReader()
      reader.onload = e => {
        addScreenMenu({
          url: e.target.result,
        })
      }
      reader.readAsDataURL(event.target.files[0])
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { screens } = this.props
    return (
      <div className="c-screens-menu-options">
        <div className="c-screens-menu-options__header">
          <div className="c-screens-menu-options__header-label">
            <Typography variant="body2" weight="semi-bold" color="text-secondary">
              Upload an image .jpg
            </Typography>
            <Typography variant="body2" style={{ color: '#B6C5CE' }}>
              From your computer
            </Typography>
          </div>
          <input
            type="file"
            name=""
            id=""
            ref={ref => {
              this.inputFile = ref
            }}
            onChange={this.loadImage}
            style={{ display: 'none' }}
          />
          <Button
            variant="outlined"
            color="primary"
            containerStyle={{ height: 38 }}
            onClick={() => {
              this.inputFile.click()
            }}
          >
            <Typography variant="body1" color="primary" weight="semi-bold">
              Import
            </Typography>
          </Button>
        </div>
        <div className="c-screens-menu-options__content">
          <div className="c-screens-menu-options__content-title">
            <Typography
              variant="body2"
              weight="semi-bold"
              color="text-secondary"
              style={{ height: 20 }}
            >
              Screens Uploaded
            </Typography>
            <Typography variant="body2" style={{ color: '#B6C5CE', height: 19 }}>
              Drag a screen into any device on the night
            </Typography>
          </div>
          <div className="c-screens-menu-options__content-gallery">
            {screens.map(screen => (
              <Image
                image={screen}
                key={screen.id}
                className="c-screens-menu-options__content-gallery-img"
                menuOptionOnAlert={SELECTED_MODULE.TEMPLATES}
                messageOnAlert="You need to add a template first!"
                itemType={ItemTypes.SCREEN}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  screens: state.screens.listScreensMenu,
})

const mapDispatchToProps = {
  addScreenMenu: ScreensActions.addScreenMenu,
}

ScreensMenuOptions.propTypes = {
  screens: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  addScreenMenu: PropTypes.func.isRequired,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ScreensMenuOptions)

import React from 'react'
import './styles.scss'
import Button from '../Button'
import Image from '../Image/index'
import { connect } from 'react-redux'
import Typography from '../Typography'
import { SELECTED_MODULE } from '../../common/constants/SelectedModuleConstant'
import { ItemTypes } from '../../common/constants/ItemTypesConstant'
import ImagesActions from './../../redux/actions/ImagesActions'
import PropTypes from 'prop-types'

class ImagesMenuOptions extends React.Component {
  loadImage = event => {
    const { addImageMenu } = this.props
    try {
      const reader = new FileReader()
      reader.onload = e => {
        addImageMenu({
          url: e.target.result,
          width: 130,
          height: 130,
        })
      }
      reader.readAsDataURL(event.target.files[0])
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { images } = this.props
    return (
      <div className="c-images-menu-options">
        <div className="c-images-menu-options__header">
          <div className="c-images-menu-options__header-label">
            <Typography variant="body2" color="text-secondary" weight="semi-bold">
              Select a image .png
            </Typography>
            <Typography variant="body2" muted>
              From your computer
            </Typography>
          </div>
          <input
            type="file"
            accept="image/png"
            onChange={this.loadImage}
            style={{ display: 'none' }}
            ref={ref => {
              this.inputFile = ref
            }}
          />
          <Button
            color="success"
            onClick={() => {
              this.inputFile.click()
            }}
            variant="outlined"
          >
            <Typography variant="body1" weight="semi-bold">
              Import
            </Typography>
          </Button>
        </div>
        {!!images.length && (
          <div className="c-images-menu-options__content">
            <div className="c-images-menu-options__content-header">
              <Typography variant="body2" color="text-secondary" weight="semi-bold">
                Images Uploaded
              </Typography>
              <Typography variant="body2" muted>
                Drag a screen into any device on the right
              </Typography>
            </div>
            <div className="c-images-menu-options__content-gallery">
              {images.map(image => (
                <Image
                  image={image}
                  key={image.id}
                  menuOptionOnAlert={SELECTED_MODULE.TEMPLATES}
                  messageOnAlert="You need to add a template first!"
                  itemType={ItemTypes.IMAGE}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  images: state.images.listImagesMenu,
})

const mapDispatchToProps = {
  addImageMenu: ImagesActions.addImageMenu,
}
ImagesMenuOptions.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  addImageMenu: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagesMenuOptions)

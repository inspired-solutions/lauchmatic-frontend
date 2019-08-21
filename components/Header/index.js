import './styles.scss'

import htmlToImage from 'html-to-image'
import React from 'react'

import Button from '../Button'
import Typography from '../Typography'
import ModalPortal from '../ModalPortal'
import ExportModal from '../ExportModal'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import AppActions from '@redux/actions/AppActions'
import PropTypes from 'prop-types'

class Header extends React.Component {
  state = {
    openExportModal: false,
  }

  toggleExportModal = isOpen => () => {
    this.setState({ openExportModal: isOpen })
  }

  handleExportDesign = () => {
    const { setCurrentDesign } = this.props
    const canvas = document.getElementById('canvas')
    htmlToImage
      .toJpeg(canvas, { quality: 0.95, style: { margin: '0px', width: '100%' } })
      .then(url => {
        setCurrentDesign(url)
        this.toggleExportModal(true)()
      })
  }

  render() {
    const { openExportModal } = this.state
    const { currentDesign, currentTemplate } = this.props
    return (
      <div className="c-header">
        <Typography variant="h5" weight="bold">
          LaunchMatic
        </Typography>

        <Typography>
          <Typography muted>Projects / </Typography>
          <Typography weight="bold">Untitled</Typography>
        </Typography>
        <Typography underline muted>
          Changes auto-saved
        </Typography>
        <Button color="primary" onClick={this.handleExportDesign} disabled={!currentTemplate}>
          <Typography variant="body1" weight="semi-bold">
            Export
          </Typography>
        </Button>
        <Button color="secondary">
          <Typography variant="body1" weight="semi-bold">
            Upgrade PRO
          </Typography>
        </Button>
        <Button color="primary">MD</Button>
        {openExportModal && (
          <ModalPortal>
            <ExportModal
              design={currentDesign}
              closeModal={this.toggleExportModal(false)}
              templateType={currentTemplate && currentTemplate.type}
            />
          </ModalPortal>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentDesign: state.app.currentDesign,
  currentTemplate: state.app.currentTemplate,
})
const mapDispatchToProps = {
  setCurrentDesign: AppActions.setCurrentDesign,
}

Header.defaultProps = {
  currentDesign: {},
  currentTemplate: {},

  setCurrentDesign: () => {},
}
Header.propTypes = {
  currentDesign: PropTypes.shape({}),
  currentTemplate: PropTypes.shape({ type: PropTypes.string }),
  setCurrentDesign: PropTypes.func,
}
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Header)

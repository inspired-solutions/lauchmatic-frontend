import './styles.scss'

import htmlToImage from 'html-to-image'
import React, { useState } from 'react'

import Button from '../Button'
import Typography from '../Typography'
import ModalPortal from '../ModalPortal'
import ExportModal from '../ExportModal'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import AppActions from './../../redux/actions/AppActions'
import PropTypes from 'prop-types'

////////////////////////////////////////////////////////////////////////////////////////////////////
import { useAppState } from './../AppStateProvider'
////////////////////////////////////////////////////////////////////////////////////////////////////

function Header({ currentDesign, currentTemplate, saving, setCurrentDesign }) {
  const [openExportModal, setOpenExportModal] = useState(false)
  const [state, dispatch] = useAppState()
  // console.log(state.templateRef)
  const toggleExportModal = isOpen => () => {
    setOpenExportModal(isOpen)
  }

  const handleExportDesign = () => {
    console.log('entro')
    const dataURL = state.templateRef.toDataURL({ pixelRatio: 3 })
    setCurrentDesign(dataURL)
    toggleExportModal(true)()
  }

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
        {saving ? 'saving...' : 'Changes auto-saved'}
      </Typography>
      <Button color="primary" onClick={handleExportDesign} disabled={!currentTemplate.id}>
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
            closeModal={toggleExportModal(false)}
            templateType={currentTemplate && currentTemplate.type}
            currentTemplate={currentTemplate}
          />
        </ModalPortal>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  currentDesign: state.app.currentDesign,
  currentTemplate: state.app.currentTemplate,
  saving: state.app.saving,
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

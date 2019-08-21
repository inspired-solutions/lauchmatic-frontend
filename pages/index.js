import './index.scss'
import React from 'react'
import Canvas from '@components/Canvas'

import { connect } from 'react-redux'
import { SELECTED_MODULE } from '@common/constants/SelectedModuleConstant'

import { compose } from 'recompose'
import PropTypes from 'prop-types'

function Home({ selectedModule, selectedText }) {
  return (
    <div className="p-index">
      <Canvas
        isOpenMenu={
          selectedModule === SELECTED_MODULE.SCREENS ||
          selectedModule === SELECTED_MODULE.BACKGROUND ||
          selectedModule === SELECTED_MODULE.IMAGES ||
          selectedModule === SELECTED_MODULE.TEMPLATES ||
          selectedModule === SELECTED_MODULE.TEXT
        }
        isCursorCrossHair={!selectedText && selectedModule === SELECTED_MODULE.TEXT}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  selectedModule: state.app.selectedModule,
  selectedText: state.texts.selectedText,
})

const mapDispatchToProps = {}

Home.defaultProps = {
  selectedModule: 0,
  selectedText: '',
}
Home.propTypes = {
  selectedModule: PropTypes.number,
  selectedText: PropTypes.string,
}
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home)

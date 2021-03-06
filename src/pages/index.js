import React, { useEffect, useRef } from 'react'
import panzoom from 'panzoom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
////////////////////////////////////////////////////////////////////////////////////////////////////
import TemplateAction from '@redux/actions/TemplateAction'
import { SELECTED_MODULE } from '@common/constants/SelectedModuleConstant'
////////////////////////////////////////////////////////////////////////////////////////////////////
import Canvas from '@components/Canvas'

import LayoutCustomer from '@components/Layouts/Customer'
import AdminDeviceThumbnailAction from '@redux/actions/AdminDeviceThumbnailAction'
import ThumbnailSelect from '@components/CustomerPage/ThumbnailSelect'
////////////////////////////////////////////////////////////////////////////////////////////////////

function Home({ selectedModule, selectedText, getDeviceThumbnails, getCustomerTemplates }) {
  const panzoomRef = useRef(null)
  useEffect(() => {
    // zoomCanvas.dispose()
    const zoomImage = document.getElementById('image-zoom')
    panzoomRef.current = panzoom(
      zoomImage,
      {
        beforeWheel: e => {
          const shouldIgnore = !e.ctrlKey
          return shouldIgnore
        },
        // filterKey:
      },
      {
        maxZoom: 2,
        minZoom: 0.5,
      }
    )
    panzoomRef.current.zoomAbs(300, 100, 1)
    getDeviceThumbnails()
    getCustomerTemplates()
  }, [])
  return (
    <LayoutCustomer>
      <div
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        className="p-index"
        style={{ width: '100%', height: '100%', zIndex: 1004, padding: 16 }}
        onMouseDown={e => {
          if (e.button === 0) {
            panzoomRef.current.pause()
          } else {
            panzoomRef.current.resume()
          }
          if (!panzoomRef.current.isPaused() && e.button === 1) {
            e.target.style.cursor = 'grab'
          } else {
            e.target.style.cursor = 'auto'
          }
        }}
      >
        <div id="image-zoom">
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
      </div>
      <ThumbnailSelect />
    </LayoutCustomer>
  )
}

const mapStateToProps = state => ({
  selectedModule: state.app.selectedModule,
  selectedText: state.texts.selectedText,
})

const mapDispatchToProps = {
  getDeviceThumbnails: AdminDeviceThumbnailAction.getDeviceThumbnails,
  getCustomerTemplates: TemplateAction.getCustomerTemplates,
}

Home.defaultProps = {
  selectedModule: 0,
  selectedText: '',
  getDeviceThumbnails: () => {},
  getCustomerTemplates: () => {},
}
Home.propTypes = {
  selectedModule: PropTypes.number,
  selectedText: PropTypes.string,
  getDeviceThumbnails: PropTypes.func,
  getCustomerTemplates: PropTypes.func,
}
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home)

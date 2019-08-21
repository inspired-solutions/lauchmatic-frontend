import './styles.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

////////////////////////////////////////////////////////////////////////////////////////////////////

class ModalPortal extends React.Component {
  el = document.createElement('div')

  componentDidMount() {
    const modalRoot = document.getElementById('__next')
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    const modalRoot = document.getElementById('__next')
    modalRoot.removeChild(this.el)
  }

  render() {
    const { children } = this.props
    return ReactDOM.createPortal(<div className="c-modal-portal">{children}</div>, this.el)
  }
}
ModalPortal.propTypes = {
  children: PropTypes.node.isRequired,
}
export default ModalPortal

import React from 'react'

import './styles.scss'
import Typography from '../Typography'

import { connect } from 'react-redux'
import AppActions from '@redux/actions/AppActions'
import PropTypes from 'prop-types'

////////////////////////////////////////////////////////////////////////////////////////////////////

class ToolTip extends React.Component {
  componentDidMount() {
    const { setMenuMessage } = this.props
    setTimeout(() => {
      setMenuMessage(null)
    }, 2500)
  }

  render() {
    const { menuMessage } = this.props
    return (
      <div className="c-tooltip-container">
        <div className="c-tooltip--left-indicator" />
        <div className="c-tooltip">
          <Typography color="light" variant="body2" weight="semi-bold">
            {menuMessage}
          </Typography>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  menuMessage: state.app.menuMessage,
})

const mapDispatchToProps = {
  setMenuMessage: AppActions.setMenuMessage,
}
ToolTip.propTypes = {
  menuMessage: PropTypes.shape({}).isRequired,
  setMenuMessage: PropTypes.func.isRequired,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolTip)

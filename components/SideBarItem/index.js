import React from 'react'
import Icon from '../Icon'
import Typography from '../Typography'
import classNames from 'classnames'

import './styles.scss'

import { connect } from 'react-redux'
import ToolTip from '../Tooltip'
import PropTypes from 'prop-types'

function SideBarItem({ icon, label, color, selected, onSelectOption, menuMessage, menuOption }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={() => {}}
      className={classNames(
        {
          [` c-side-bar-item--${color}`]: selected,
        },
        ' c-side-bar-item'
      )}
      onClick={onSelectOption}
    >
      <Icon size="large" color={selected ? color : 'text-secondary'}>
        {icon}
      </Icon>
      <Typography weight="bold" variant="caption" color="text-secondary">
        {label}
      </Typography>
      {!!menuMessage && menuOption === menuMessage.menuOption && (
        <ToolTip message={menuMessage.message} />
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  menuMessage: state.app.menuMessage,
})
const mapDispatchToProps = {}

SideBarItem.defaultProps = {
  icon: null,
  label: '',
  selected: false,
  menuMessage: {},
}

SideBarItem.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.node,
  selected: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'success-light']).isRequired,
  onSelectOption: PropTypes.func.isRequired,
  menuMessage: PropTypes.shape({
    message: PropTypes.string,
    menuOption: PropTypes.string,
  }),
  menuOption: PropTypes.number.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarItem)

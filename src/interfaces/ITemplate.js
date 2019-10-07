import PropTypes from 'prop-types'
import IDevice from './IDevice'

const ITemplate = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  devices: PropTypes.arrayOf(PropTypes.shape(IDevice)),
}

export default ITemplate

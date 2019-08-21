import PropTypes from 'prop-types'

const IText = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string,
  fontStyle: PropTypes.oneOf(['italic', 'normal', 'bold']),
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  color: PropTypes.shape({ hex: PropTypes.string, opacity: PropTypes.number }),
}

export default IText

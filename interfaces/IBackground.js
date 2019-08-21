import PropTypes from 'prop-types'

const IBackground = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // value: PropTypes.shape({
  //   hex: PropTypes.string,
  //   opacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  //   gradient: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // }),
  hex: PropTypes.string,
  opacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  gradient: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
export default IBackground

import React from 'react'
import { Layer, Rect } from 'react-konva'
import PropTypes from 'prop-types'
import { TEMPLATE_TYPES } from './../../../common/constants/TemplateConstant'

function Gutters({ width, height, template }) {
  return (
    <Layer>
      {template.screen_quantity === TEMPLATE_TYPES.THREE_SCREEN && (
        <>
          <Rect x={268} y={0} width={16} height={height} fill="#f9f9f9" />
          <Rect x={552} y={0} width={16} height={height} fill="#f9f9f9" />
        </>
      )}
      {template.screen_quantity === TEMPLATE_TYPES.TWO_SCREEN && (
        <Rect x={width / 2 - 8} y={0} width={16} height={height} fill="#f9f9f9" />
      )}
    </Layer>
  )
}

Gutters.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  template: PropTypes.shape({
    screen_quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
}

export default Gutters

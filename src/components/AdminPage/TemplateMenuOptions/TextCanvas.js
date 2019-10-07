import React from 'react'
import { Text } from 'react-konva'

////////////////////////////////////////////////////////////////////////////////////////////////////

function TextCanvas({ value, x, y, width, height, rotation }) {
  console.log({ value, x, y, width, height, rotation })
  return (
    <Text
      text={value}
      x={Number(x)}
      y={Number(y)}
      width={Number(width)}
      height={Number(height)}
      rotation={Number(rotation)}
    />
  )
}
export default TextCanvas

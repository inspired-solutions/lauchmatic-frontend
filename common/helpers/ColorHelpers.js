/* eslint import/prefer-default-export: 0 */ //
import Color from 'color'

export const getRgba = color => {
  const { hex, opacity } = color
  try {
    const rgba = Color(hex)
      .rgb()
      .alpha(opacity / 100)

    return `rgba(${rgba.color[0]},${rgba.color[1]},${rgba.color[2]},${rgba.valpha})`
  } catch (error) {
    console.log('error in conversion not worry')
  }
  return ''
}

export const getRgbaObject = color => {
  const { hex, opacity } = color
  try {
    const rgba = Color(hex)
      .rgb()
      .alpha(opacity / 100)

    return {
      r: rgba.color[0],
      g: rgba.color[1],
      b: rgba.color[2],
      a: rgba.valpha <= 1 ? rgba.valpha : (rgba.valpha / 100).toFixed(2),
    }
  } catch (error) {
    console.log('error in conversion not worry')
  }
  return ''
}

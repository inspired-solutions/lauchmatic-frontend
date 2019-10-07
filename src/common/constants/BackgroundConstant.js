export const COLOR_FILL_TYPE = {
  SOLID_FILL_ONE_COLOR: 0,
  GRADIENT_FILL_LINEAR: 1,
  GRADIENT_FILL_RADIAL: 2,
}

export const COLOR_FILL = [
  { value: COLOR_FILL_TYPE.SOLID_FILL_ONE_COLOR, primary: 'Solid Fill', secondary: 'One Color' },
  { value: COLOR_FILL_TYPE.GRADIENT_FILL_LINEAR, primary: 'Gradient Fill', secondary: 'Linear' },
  { value: COLOR_FILL_TYPE.GRADIENT_FILL_RADIAL, primary: 'Gradient Fill', secondary: 'Radial' },
]

export const GRADIENT_COLOR_SELECTED = {
  START: 'START',
  END: 'END',
}

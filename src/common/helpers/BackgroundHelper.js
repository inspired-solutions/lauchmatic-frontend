import { getRgba } from './ColorHelpers'

const getBackgroundColor = value => {
  const { hex, opacity, imageUrl } = value

  return imageUrl || getRgba({ hex, opacity })
}

export default {
  getBackgroundColor,
}

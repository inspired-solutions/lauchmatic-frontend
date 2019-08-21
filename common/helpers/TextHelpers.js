import { isEqual } from 'lodash-es'
import memoizeOne from 'memoize-one'
import { getRgba } from './ColorHelpers'

const getCurrentText = memoizeOne((texts, selectedText) => {
  return texts.find(text => text.id === selectedText) || {}
}, isEqual)

const getCanvasColor = memoizeOne(text => {
  const { color } = text
  return getRgba(color)
}, isEqual)

export default {
  getCurrentText,
  getCanvasColor,
}

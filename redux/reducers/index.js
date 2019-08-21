import { combineReducers } from 'redux'
import AppReducer from './AppReducer'
import ImagesReducer from './ImagesReducer'
import TextReducer from './TextReducer'
import BackgroundReducer from './BackgroundReducer'
import ScreensReducer from './ScreensReducer'
import TemplateReducer from './TemplateReducer'

export default combineReducers({
  app: AppReducer,
  images: ImagesReducer,
  texts: TextReducer,
  backgrounds: BackgroundReducer,
  screens: ScreensReducer,
  template: TemplateReducer,
})

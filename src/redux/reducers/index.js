import { combineReducers } from 'redux'
import AppReducer from './AppReducer'
import ImagesReducer from './ImagesReducer'
import TextReducer from './TextReducer'
import BackgroundReducer from './BackgroundReducer'
import ScreensReducer from './ScreensReducer'
import TemplateReducer from './TemplateReducer'
import AdminTemplateReducer from './AdminTemplatesReducer'
import AdminAppReducer from './AdminAppReducer'
import AdminDevicesReducer from './AdminDevicesReducer'
import AdminDeviceThumbnailReducer from './AdminDeviceThumbnailReducer'
import AdminTextReducer from './AdminTextReducer'
import AuthReducer from './AuthReducer';

export default combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  images: ImagesReducer,
  texts: TextReducer,
  backgrounds: BackgroundReducer,
  screens: ScreensReducer,
  template: TemplateReducer,
  adminTemplate: AdminTemplateReducer,
  adminApp: AdminAppReducer,
  adminDevice: AdminDevicesReducer,
  adminDeviceThumbnail: AdminDeviceThumbnailReducer,
  adminText: AdminTextReducer,
})

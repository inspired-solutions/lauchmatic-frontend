import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import reducer from './reducers'

const initializeStore = initialState => {
  if (initialState) {
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
  }
  return createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
}

export default initializeStore

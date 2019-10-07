import React, { createContext, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'

const AppContext = createContext()

function AppStateProvider({ children, initialState, reducer }) {
  const value = useReducer(reducer, initialState)
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

AppStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialState: PropTypes.shape({}).isRequired,
  reducer: PropTypes.func.isRequired,
}

function useAppState() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppStateProvider')
  }
  return context
}

export default AppStateProvider

export { useAppState }

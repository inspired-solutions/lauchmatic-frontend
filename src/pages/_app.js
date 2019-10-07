import React from 'react'
import App from 'next/app'
import '@styles/index.scss'
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron, debug } from '../styletron'
import { LightTheme, BaseProvider } from 'baseui'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import withReduxStore from '../redux/withReduxStore'

////////////////////////////////////////////////////////////////////////////////////////////////////

import AppStateProvider from '@components/AppStateProvider'
////////////////////////////////////////////////////////////////////////////////////////////////////
function reducer(state, action) {
  switch (action.type) {
    case 'SET_TEMPLATE_REF':
      return { state, templateRef: action.payload }

    default:
      return state
  }
}
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    console.log('entro a getInitialProps')
    return { pageProps }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
        <BaseProvider theme={LightTheme}>
          <Provider store={reduxStore}>
            <DndProvider backend={HTML5Backend}>
              <>
                <AppStateProvider
                  initialState={{
                    templateRef: null,
                  }}
                  reducer={reducer}
                >
                  <Component {...pageProps} />
                </AppStateProvider>
              </>
            </DndProvider>
          </Provider>
        </BaseProvider>
      </StyletronProvider>
    )
  }
}

export default withReduxStore(MyApp)

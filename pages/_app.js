import React from 'react'
import App, { Container } from 'next/app'
// import '@styles/index.scss'
import Layout from '@components/Layout'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import withReduxStore from '../redux/withReduxStore'
import firebaseConfig from '../environment/Firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

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

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
      firebase.firestore()
    }

    return (
      <Container>
        <Provider store={reduxStore}>
          <DndProvider backend={HTML5Backend}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </DndProvider>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)

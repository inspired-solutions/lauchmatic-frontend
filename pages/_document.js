// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import styles from '@styles/index.scss'

////////////////////////////////////////////////////////////////////////////////////////////////////

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Poppins&display=swap"
            rel="stylesheet"
          />

          <link rel="icon" href="/static/icons/launchmatic_icon.png" type="image/x-icon" />
        </Head>
        <body>
          <style jsx global>
            {styles}
          </style>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

import React from 'react'
import Page from '../layouts/main'
import Link from 'next/link'
import Head from 'next/head'

class Home extends React.Component {
  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => {
          console.log('service worker registration successful')
        })
        .catch(err => {
          console.warn('service worker registration failed', err.message)
        })
    }
  }

  render() {
    return (
      <Page>
        <Head>
          <title>cui ning</title>
        </Head>

        <div className="home">
          <div className="main">
            <h1>cui ning</h1>
            <nav>
              <a target="_blank" href="https://github.com/cuining">
                Github
              </a>
              <Link href="/essays">
                <a>Essays</a>
              </Link>
              <a href="/about">About</a>
            </nav>
          </div>
        </div>

        <style jsx>{`
          .home {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: -1;
          }

          .main {
            flex: none;
            text-align: center;
          }

          h1 {
            font-size: 14px;
            font-weight: normal;
          }

          nav {
            margin-top: 20px;
          }

          a {
            display: inline-block;
            margin: 0 15px;
            text-decoration: none;
          }
        `}</style>
      </Page>
    )
  }
}

export default Home

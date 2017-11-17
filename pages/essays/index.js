import React, { Component } from 'react'
import Page from '../../layouts/main'
import Link from 'next/link'
import Head from 'next/head'
import 'isomorphic-fetch'

class Posts extends Component {
  static async getInitialProps () {
    const res = await fetch('https://api.github.com/repos/cuining/blog/issues')
    const issues = await res.json()

    return { issues }
  }

  render () {
    return (
      <Page>
        <Head>
          <title>Essays</title>
        </Head>
        <div className="posts">
          {this.props.issues.map(({ id, number, updated_at, title }) => (
            <Post number={number} key={id} date={updated_at} title={title} />
          ))}
        </div>
      </Page>
    )
  }
}

const format = t => `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDay())} ${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`

const pad = n => n < 10 ? `0${n}` : n

const Post = ({ number, date, title }) => (
  <div className="post">
    <span className="date">{format(new Date(date))}</span>
    <Link href={`/essays/detail?id=${number}`} as={`/essays/${number}`}>
      <a>{title}</a>
    </Link>

    <style jsx>{`
      .post {
        margin-bottom: 10px;
      }

      .date {
        display: inline-block;
        width: 240px;
        text-align: right;
        margin-right: 30px;
        color: #999;
      }

      a {
        text-decoration: none;
      }

      @media (max-width: 500px) {
        .post {
          margin-bottom: 15px;
        }

        .date {
          display: block;
          width: inherit;
          text-align: inherit;
          font-size: 11px;
          color: #ccc;
          margin-bottom: 5px;
        }
      }
    `}</style>
  </div>
)

export default Posts

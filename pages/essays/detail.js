import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Post from '../../layouts/post'
import Title from '../../components/post/title'
import 'isomorphic-fetch'
import marked from 'marked'

class Detail extends Component {
  static async getInitialProps({ query }) {
    let issue
    if (query.id) {
      const res = await fetch(`https://api.github.com/repos/cuining/blog/issues/${query.id}`)

      issue = await res.json()
      if (!issue.title) {
        issue = null
      }
    }

    return { issue }
  }

  render() {
    const { issue } = this.props

    if (issue) {
      const html = marked(issue.body)
      return (
        <Post>
          <Head>
            <title>{issue.title}</title>
          </Head>
          <Title>{issue.title}</Title>
          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
        </Post>
      )
    }

    return <div>not found ~</div>
  }
}

export default Detail

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Page from '../../layouts/main'
import ErrorMessage from '../../components/error-message'
import Link from 'next/link'
import Head from 'next/head'

const Posts = ({ data: { error, loading, repository } }) => {
  if (error) return <ErrorMessage message="Error loading posts." />

  return (
    <Page>
      <Head>
        <title>Essays</title>
      </Head>
      <div className="posts">
        {loading
          ? 'Loading...'
          : repository &&
            repository.issues &&
            repository.issues.nodes &&
            repository.issues.nodes.map(({ number, createdAt, title }) => (
              <Post number={number} key={number} date={createdAt} title={title} />
            ))}
      </div>
      <style jsx>{`
        .posts {
          display: flex;
          flex-direction: column-reverse;
        }
      `}</style>
    </Page>
  )
}

const format = t => t.substr(0, 10)

const Post = ({ number, date, title }) => (
  <div className="post">
    <span className="date">{format(date)}</span>
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

const allIssues = gql`
  query {
    repository(owner: "cuining", name: "blog") {
      issues(last: 30, states: OPEN) {
        nodes {
          title
          number
          createdAt
        }
      }
    }
  }
`

export default graphql(allIssues)(Posts)

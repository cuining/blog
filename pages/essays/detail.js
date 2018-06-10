import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'
import ErrorMessage from '../../components/error-message'
import Head from 'next/head'
import Post from '../../layouts/post'
import Title from '../../components/post/title'
import marked from 'marked'

const Detail = ({ data: { error, repository } }) => {
  if (error) return <ErrorMessage message="not found ~" />

  if (repository && repository.issue) {
    const html = marked(repository.issue.body)
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

  return 'Loading...'
}

const issue = gql`
  query issue($number: Int!) {
    repository(owner: "cuining", name: "blog") {
      issue(number: $number) {
        body
        comments(last: 3) {
          edges {
            node {
              body
            }
          }
        }
      }
    }
  }
`

export default withRouter(
  graphql(issue, {
    options: ({ router: { query } }) => ({
      variables: {
        number: parseInt(query.id, 10)
      }
    })
  })(Detail)
)

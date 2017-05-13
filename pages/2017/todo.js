import Head from 'next/head'
import Post from '../../layouts/post'
import Meta from '../../components/post/meta'
import Quote from '../../components/post/quote'
import Title from '../../components/post/title'
import withViews from '../../lib/with-views'

export default withViews(({ views }) => (
  <Post>
    <Head><title>todo</title></Head>
    <Title>old posts</Title>
    <Meta date="March 28, 2017" views={ views } />
    <a href="https://github.com/cuining/blog/issues" target="_blank">see here</a>
    <Quote>TODO：use marked + highlight/prismjs</Quote>
  </Post>
))

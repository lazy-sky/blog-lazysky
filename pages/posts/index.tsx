import Head from 'next/head'

import IPost from 'types/post'
import { getAllPosts } from 'utils/documents'
import PageHeader from 'components/pageHeader'
import PostPreview from './PostPreview'

interface IPostsProps {
  posts: IPost[]
}

const Posts = ({ posts }: IPostsProps) => {
  return (
    <>
      <Head>
        <title>Posts | LazySky Blog</title>
        <meta name='description' content='Posts created by lazy sky' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageHeader title='Posts' hasBackBtn />
      <section>
        {posts?.map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </section>
    </>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts(['title', 'date', 'slug', 'coverImage', 'excerpt'])

  return {
    props: {
      posts,
    },
  }
}

export default Posts

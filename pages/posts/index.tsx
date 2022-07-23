import Head from 'next/head'

import IPost from 'types/post'
import { getAllPosts } from 'utils/documents'
import PageHeader from 'components/pageHeader'
import Tags from './Tags'
import PostPreview from 'components/PostPreview'

import styles from './posts.module.scss'

interface IPostsProps {
  posts: IPost[]
}

const Posts = ({ posts }: IPostsProps) => {
  const tagsMap = new Map<string | undefined, number>()
  const tags: (string | number | undefined)[][] = []

  posts
    .map((post) => post.tags)
    .flat()
    .forEach((tag) => {
      tagsMap.set(tag, Number(tagsMap.get(tag)) + 1 || 1)
    })

  tagsMap.forEach((count, tag) => {
    tags.push([tag, count])
  })

  return (
    <>
      <Head>
        <title>Posts | LazySky Blog</title>
        <meta name='description' content='Posts created by lazy sky' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageHeader title='Posts' hasBackBtn />
      <div className={styles.posts}>
        <Tags tags={tags} />
        <section>
          <ol>
            {posts?.map((post) => (
              <PostPreview key={post.slug} post={post} />
            ))}
          </ol>
        </section>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'coverImage',
    'excerpt',
    'tags',
  ])

  return {
    props: {
      posts,
    },
  }
}

export default Posts

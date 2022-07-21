import Head from 'next/head'
import { useRouter } from 'next/router'
import parse from 'html-react-parser'

import IPost from 'types/post'
import { getAllPosts, getPostBySlug } from 'utils/documents'
import markdownToHtml from 'utils/markdownToHtml'
import PageHeader from 'components/pageHeader'
import Comments from 'components/Comments'

import markdownStyles from 'styles/markdown.module.scss'
import styles from './post.module.scss'

interface IPostProps {
  post: IPost
  otherPosts: any
}

// TODO: otherPosts 이용해서 이전, 이후 게시글 표시
const Post = ({ post, otherPosts }: IPostProps) => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <>
      <Head>
        <title>{post.title} | LazySky Blog</title>
        <meta
          name='description'
          content={`post about ${slug} written by lazy sky`}
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageHeader title='Post' hasBackBtn />
      <div className={styles.post}>
        <h2 className={styles.title}>{post.title}</h2>
        <div className={markdownStyles.markdown}>{parse(post.content)}</div>
      </div>
      <Comments />
    </>
  )
}

export default Post

interface IParams {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: IParams) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'coverImage',
    'excerpt',
  ])

  const currentPostIndex = allPosts.findIndex((x) => x.slug === post.slug)

  // TODO: 페이지네이션
  const otherPosts = [
    allPosts[currentPostIndex + 1] || null,
    allPosts[currentPostIndex - 1] || null,
  ]

  return {
    props: {
      post: {
        ...post,
        content,
      },
      otherPosts,
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

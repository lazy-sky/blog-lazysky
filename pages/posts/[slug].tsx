import { useRouter } from 'next/router'
import markdownToHtml from 'utils/markdownToHtml'
import parse from 'html-react-parser'

import { getAllPosts, getPostBySlug } from 'utils/documents'

import markdownStyles from 'styles/markdown.module.scss'

const Post = ({ post, otherPosts }: any) => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div>
      <p>Post: {slug}</p>
      <div>{post.title}</div>
      <div className={markdownStyles.markdown}>{parse(post.content)}</div>
    </div>
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

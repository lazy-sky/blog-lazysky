import { useRouter } from 'next/router'
import markdownToHtml from '../../utils/markdownToHtml'
import parse from 'html-react-parser'

import { getAllProjects, getProjectBySlug } from '../../utils/documents'

import markdownStyles from '../../styles/markdown.module.scss'

const ProjectDetail = ({ post }: any) => {
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

export default ProjectDetail

interface IParams {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: IParams) {
  const post = getProjectBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const projects = getAllProjects(['slug'])

  return {
    paths: projects.map((project) => {
      return {
        params: {
          slug: project.slug,
        },
      }
    }),
    fallback: false,
  }
}

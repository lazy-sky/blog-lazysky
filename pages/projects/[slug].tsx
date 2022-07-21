/* eslint-disable max-lines */
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import parse from 'html-react-parser'
import cx from 'classnames'

import { IProject } from 'types/notionData'
import markdownToHtml from 'utils/markdownToHtml'
import { getProjectBySlug } from 'utils/documents'
import PageHeader from 'components/pageHeader'
import Comments from 'components/Comments'

import markdownStyles from 'styles/markdown.module.scss'
import styles from './projectDetail.module.scss'

interface IProjectDetailProps {
  properties: any
  article: any
}

interface ITag {
  id: string
  name: string
}

const ProjectDetail = (props: IProjectDetailProps) => {
  const {
    properties: { Photo, Name, Tags, Tech, Deploy, Code },
    article: { content, digest },
  } = props

  const title = Name.results[0].title.plain_text
  const imageSrc = Photo.files[0].file.url
  const deployUrl = Deploy.url
  const codeUrl = Code.results[0].rich_text.plain_text
  const tags: ITag[] = Tags.multi_select
  const techs: ITag[] = Tech.multi_select

  return (
    <>
      <Head>
        <title>{title} | LazySky Blog</title>
        <meta
          name='description'
          content={`${title} project written by lazy sky`}
        />
      </Head>
      <PageHeader title='Project' hasBackBtn />
      <div className={styles.projectDetail}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.coverImage}>
          <Image
            priority
            src={imageSrc}
            width='100%'
            height='100%'
            layout='responsive'
            objectFit='contain'
            alt='프로젝트 대표 사진'
          />
        </div>
        <div className={styles.meta}>
          <div className={styles.digest}>{digest}</div>
          <ul className={styles.tags}>
            {tags.map(({ id, name }) => (
              <li key={id} className={styles.tag}>
                {name}
              </li>
            ))}
          </ul>
          <ul className={styles.tags}>
            {techs.map(({ id, name }) => (
              <li key={id} className={cx(styles.tag, styles.tech)}>
                {name}
              </li>
            ))}
          </ul>
          <div className={styles.links}>
            <a href={deployUrl} target='_blank' rel='noreferrer'>
              Deploy
            </a>
            <a href={codeUrl} target='_blank' rel='noreferrer'>
              Codes
            </a>
          </div>
        </div>
        <div className={cx(styles.article, markdownStyles.markdown)}>
          {parse(content)}
        </div>
      </div>
      <Comments />
    </>
  )
}

export default ProjectDetail

export async function getStaticProps({ params }: any) {
  const { slug } = params

  const options = {
    method: 'GET',
    url: `https://api.notion.com/v1/pages/${slug}`,
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-06-28',
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
    },
  }

  const { data } = await axios.request(options)

  const getProperty = (propertyId: string) => ({
    method: 'GET',
    url: `https://api.notion.com/v1/pages/${slug}/properties/${propertyId}`,
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-06-28',
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
    },
  })

  const properties: any = {}
  for await (const key of Object.keys(data.properties)) {
    const res = await axios.request(getProperty(key))
    properties[key] = res.data
  }

  const fileName = properties.Name.results[0].title.plain_text
  const article = getProjectBySlug(fileName, ['title', 'content', 'digest'])
  const content = await markdownToHtml(article.content || '')

  return {
    props: {
      properties,
      article: {
        ...article,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const options = {
    method: 'POST',
    url: `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
    },
  }

  const {
    data: { results },
  } = await axios.request(options)

  return {
    paths: results.map((project: IProject) => {
      return {
        params: {
          slug: project.id,
        },
      }
    }),
    fallback: false,
  }
}

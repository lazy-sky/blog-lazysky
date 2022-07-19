/* eslint-disable max-lines */
import Image from 'next/image'
import axios from 'axios'
import parse from 'html-react-parser'

import { IProject } from 'types/notionData'
import markdownToHtml from 'utils/markdownToHtml'
import { getProjectBySlug } from 'utils/documents'

import markdownStyles from 'styles/markdown.module.scss'

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
    article,
  } = props
  const title = Name.results[0].title.plain_text
  const imageSrc = Photo.files[0].file.url
  const deployUrl = Deploy.url
  const codeUrl = Code.results[0].rich_text.plain_text
  const tags: ITag[] = Tags.multi_select
  const techs: ITag[] = Tech.multi_select

  return (
    <div>
      <Image
        priority
        src={imageSrc}
        height={100}
        width={100}
        layout='responsive'
        objectFit='cover'
        alt='프로젝트 대표 사진'
      />
      <div>
        <h3>{title}</h3>
        <ul>
          {tags.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
        <ul>
          {techs.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
        <div>
          <a href={deployUrl} target='_blank' rel='noreferrer'>
            Deploy
          </a>
          <a href={codeUrl} target='_blank' rel='noreferrer'>
            Codes
          </a>
        </div>
      </div>
      {/* <h1 className={styles.title}>{article.title}</h1> */}
      <div className={markdownStyles.markdown}>{parse(article.content)}</div>
    </div>
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
  const article = getProjectBySlug(fileName, [
    'title',
    'date',
    'slug',
    'content',
    'ogImage',
    'coverImage',
  ])
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

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import cx from 'classnames'

import { IProject } from '../../types/notionData'
import PageHeader from '../../components/pageHeader'

import styles from './projects.module.scss'

interface IPostsProps {
  results: IProject[]
}

const Projects = ({ results }: IPostsProps) => {
  return (
    <>
      <Head>
        <title>LazySky Blog | Projects</title>
        <meta name='description' content='Projects created by lazy sky' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageHeader title='Projects' hasBackBtn />
      <ul className={styles.projects}>
        {results.map((post: IProject) => {
          const {
            id,
            properties: { Name, Code, Tags, Photo, Tech, Deploy },
          } = post

          return (
            <li key={id}>
              <Image
                priority
                src={Photo.files[0].file.url}
                height={100}
                width={100}
                layout='responsive'
                objectFit='cover'
                alt='프로젝트 대표 사진'
              />
              <div className={styles.info}>
                <h3 className={styles.projectName}>
                  {Name.title[0].plain_text}
                </h3>
                <ul className={styles.tags}>
                  {Tags.multi_select.map((tag) => (
                    <li key={tag.id} className={styles.tag}>
                      {tag.name}
                    </li>
                  ))}
                </ul>
                <ul className={styles.tags}>
                  {Tech.multi_select.map((tag) => (
                    <li key={tag.id} className={cx(styles.tech, styles.tag)}>
                      {tag.name}
                    </li>
                  ))}
                </ul>
                <div className={styles.links}>
                  <a href={Deploy.url} target='_blank' rel='noreferrer'>
                    Deploy
                  </a>
                  <a
                    href={Code.rich_text[0].plain_text}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Codes
                  </a>
                </div>
                <div>
                  <Link href={post.url}>
                    <a target='_blank' rel='noreferrer'>
                      자세히 보기
                    </a>
                  </Link>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Projects

export async function getStaticProps() {
  const options = {
    method: 'POST',
    url: `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-02-22',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
    },
  }

  const {
    data: { results },
  } = await axios.request(options)

  return {
    props: { results },
  }
}

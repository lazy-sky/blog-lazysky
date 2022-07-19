import Head from 'next/head'
import axios from 'axios'

import { IProject } from 'types/notionData'
import PageHeader from 'components/pageHeader'

import styles from './projects.module.scss'
import ProjectPreview from 'components/ProjectPreview'

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
      <section>
        <ol className={styles.projects}>
          {results?.map((project) => (
            <ProjectPreview key={project.id} project={project} />
          ))}
        </ol>
      </section>
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

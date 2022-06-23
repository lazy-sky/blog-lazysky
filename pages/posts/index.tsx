import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'

import PageHeader from '../../components/pageHeader'

import styles from './posts.module.scss'

const Posts: NextPage = ({ results }: any) => {
  // console.log(results)

  return (
    <>
      <Head>
        <title>LazySky Blog | Posts</title>
        <meta name='description' content='Posts created by lazy sky' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageHeader title='Posts' hasBackBtn />
      <ul className={styles.posts}>
        {results.map((post: any) => (
          <li key={post.id}>
            <div>{post.properties.Name.title[0].plain_text}</div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Posts

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

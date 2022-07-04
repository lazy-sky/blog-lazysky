import type { NextPage } from 'next'
import Head from 'next/head'

import PageHeader from '../../components/pageHeader'

const Projects: NextPage = () => {
  return (
    <>
      <Head>
        <title>LazySky Blog | Posts</title>
        <meta name='description' content='Posts created by lazy sky' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageHeader title='Posts' hasBackBtn />
      <div>Post 1</div>
      <div>Post 2</div>
      <div>Post 3</div>
    </>
  )
}

export default Projects

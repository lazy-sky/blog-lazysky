import type { NextPage } from 'next'
import Head from 'next/head'

import PageHeader from '../../components/pageHeader'

const Projects: NextPage = () => {
  return (
    <>
      <Head>
        <title>LazySky Blog | Projects</title>
        <meta name='description' content='Projects created by lazy sky' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageHeader title='Posts' hasBackBtn />
      <div>Projects1</div>
      <div>Projects2</div>
      <div>Projects3</div>
    </>
  )
}

export default Projects

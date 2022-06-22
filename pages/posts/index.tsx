import type { NextPage } from 'next'
import Head from 'next/head'

import PageHeader from '../../components/pageHeader'

const Posts: NextPage = () => {
  return (
    <>
      <Head>
        <title>LazySky Blog | Posts</title>
        <meta name='description' content='Posts created by lazy sky' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageHeader title='Posts' hasBackBtn />
      <div>게시글1</div>
      <div>게시글2</div>
      <div>게시글3</div>
    </>
  )
}

export default Posts

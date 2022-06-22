import type { NextPage } from 'next'
import Head from 'next/head'

import PageHeader from '../../components/pageHeader'

const Contacts: NextPage = () => {
  return (
    <>
      <Head>
        <title>LazySky Blog | Contacts</title>
        <meta name='description' content='Contacts of lazy sky' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageHeader title='Posts' hasBackBtn />
      <div>Github</div>
      <div>Kakao</div>
      <div>Instagram</div>
      <div>Buy me a coffee</div>
    </>
  )
}

export default Contacts

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { TorsoLogo } from 'assets/images'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>LazySky Blog</title>
        <meta name='description' content='Blog made by next and notion' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div style={{ padding: '50px' }}>
        <Image
          priority
          src={TorsoLogo}
          width='100%'
          height='100%'
          layout='responsive'
          objectFit='contain'
          alt='logo'
        />
      </div>
    </div>
  )
}

export default Home

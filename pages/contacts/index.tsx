import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'

import PageHeader from 'components/pageHeader'
import { GithubIcon, InstagramIcon, KakaoIcon } from 'assets/images'

import styles from './contacts.module.scss'

const Contacts: NextPage = () => {
  return (
    <div className={styles.contacts}>
      <Head>
        <title>LazySky Blog | Contacts</title>
        <meta name='description' content='Contacts of lazy sky' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageHeader title='Contacts' hasBackBtn />
      <div className={styles.links}>
        <a href='https://github.com/lazy-sky' target='_blank' rel='noreferrer'>
          <Image src={GithubIcon} alt='Github' width={64} height={64} />
        </a>
        <a
          href='https://open.kakao.com/o/siQfK7ke'
          target='_blank'
          rel='noreferrer'
        >
          <Image src={KakaoIcon} alt='Kakao talk' width={64} height={64} />
        </a>
        <a
          href='https://open.kakao.com/o/siQfK7ke'
          target='_blank'
          rel='noreferrer'
        >
          <Image src={InstagramIcon} alt='Instagram' width={64} height={64} />
        </a>
        <a
          href='https://www.buymeacoffee.com/lazysky'
          target='_blank'
          rel='noreferrer'
        >
          <Image
            src='https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg'
            alt='Sponsor the owner'
            width={64}
            height={64}
          />
        </a>
      </div>
    </div>
  )
}

export default Contacts

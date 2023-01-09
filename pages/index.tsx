import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { TorsoLogoSVG, PostIcon } from 'assets/images'

import styles from './home.module.scss'
import Link from 'next/link'

const links = [
  { href: '/posts', image: PostIcon, text: '게시글 보러가기' },
  // { href: '/projects', image: ProjectIcon, text: '프로젝트 보러가기' },
  {
    href: 'https://www.buymeacoffee.com/lazysky',
    image: 'https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg',
    text: '주인장 커피 사주기',
  },
]

const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <Head>
        <title>LazySky Blog</title>
        <meta name='description' content='Blog made by next and notion' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className={styles.title}>
        <span className={styles.name}>Lazysky</span>의 블로그에 오신 것을
        환영합니다!
      </h1>
      <ul className={styles.links}>
        {links.map(({ href, image, text }) => (
          <li key={text} className={styles.link}>
            <Link href={href}>
              <a>
                <Image src={image} alt={text} width={32} height={32} />
                <div>{text}</div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.logo}>
        <Image
          priority
          src={TorsoLogoSVG}
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

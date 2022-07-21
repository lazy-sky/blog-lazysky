import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import TypeitText from 'components/TypeitText'
import { TorsoLogoSVG, PostIcon, ProjectIcon } from 'assets/images'

import styles from './home.module.scss'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <Head>
        <title>LazySky Blog</title>
        <meta name='description' content='Blog made by next and notion' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className={styles.title}>
        <TypeitText>
          <span className={styles.name}>Lazysky</span>의 블로그에 오신 것을
          환영합니다!
        </TypeitText>
      </h1>
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
      <ul className={styles.links}>
        <li className={styles.link}>
          <Link href='/posts'>
            <a>
              <Image src={PostIcon} alt='To Posts' width={32} height={32} />
              <div>게시글 보러가기</div>
            </a>
          </Link>
        </li>
        <li className={styles.link}>
          <Link href='/projects'>
            <a>
              <Image
                src={ProjectIcon}
                alt='To Projects'
                width={32}
                height={32}
              />
              <div>프로젝트 보러가기</div>
            </a>
          </Link>
        </li>
        <li className={styles.link}>
          <a
            href='https://www.buymeacoffee.com/lazysky'
            target='_blank'
            rel='noreferrer'
          >
            <Image
              src='https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg'
              alt='Buy me a coffee'
              width={32}
              height={32}
            />
            <div>주인장 커피 사주기</div>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Home

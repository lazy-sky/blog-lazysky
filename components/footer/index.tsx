import Image from 'next/image'

import { GithubIcon, InstagramIcon } from '../../assets/images/index'

import styles from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.links}>
        <li>
          <a
            href='https://github.com/lazy-sky'
            target='_blank'
            rel='noreferrer'
          >
            <Image
              priority
              src={GithubIcon}
              height={24}
              width={24}
              alt='github'
            />
          </a>
        </li>
        <li>
          <a
            href='https://www.instagram.com/sky_lazy'
            target='_blank'
            rel='noreferrer'
          >
            <Image
              priority
              src={InstagramIcon}
              height={24}
              width={24}
              alt='instagram'
            />
          </a>
        </li>
      </ul>
      <div>Copyright 2022. @lazy-sky. All rights reserved.</div>
    </footer>
  )
}

export default Footer

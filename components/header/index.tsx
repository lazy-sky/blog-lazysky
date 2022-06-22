import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cx from 'classnames'

import { FaceLogo, MenuIcon } from '../../assets/images'

import styles from './header.module.scss'

const Header = () => {
  const [isMenuShow, setIsMenuShow] = useState(false)

  const handleMenuClick = () => {
    setIsMenuShow((prev) => !prev)
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>
            <Image src={FaceLogo} height={32} width={32} alt='logo' />
          </a>
        </Link>
      </div>
      <nav className={cx(styles.navigation, isMenuShow && styles.active)}>
        <button
          type='button'
          onClick={handleMenuClick}
          className={styles.menuBtn}
        >
          <Image src={MenuIcon} height={32} width={32} alt='menu' />
        </button>

        <ul>
          <li>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href='/posts'>
              <a>Posts</a>
            </Link>
          </li>
          <li>
            <Link href='/projects'>
              <a>Projects</a>
            </Link>
          </li>
          <li>
            <Link href='/contacts'>
              <a>Contacts</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useClickAway } from 'react-use'
import cx from 'classnames'

import { FaceLogo, MenuIcon } from '../../assets/images'

import styles from './header.module.scss'

const Header = () => {
  const { pathname } = useRouter()
  const [isMenuShow, setIsMenuShow] = useState(false)
  const navRef = useRef(null)

  const handleMenuClick = () => {
    setIsMenuShow((prev) => !prev)
  }
  useClickAway(navRef, () => {
    if (!isMenuShow) return
    setIsMenuShow(false)
  })

  useEffect(() => {
    setIsMenuShow(false)
  }, [pathname])

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>
            <Image src={FaceLogo} height={32} width={32} alt='logo' />
          </a>
        </Link>
      </div>
      <nav
        ref={navRef}
        className={cx(styles.navigation, isMenuShow && styles.active)}
      >
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
              <a className={cx(pathname === '/' && styles.active)}>Home</a>
            </Link>
          </li>
          <li>
            <Link href='/posts'>
              <a className={cx(pathname === '/posts' && styles.active)}>
                Posts
              </a>
            </Link>
          </li>
          {/* <li>
            <Link href='/projects'>
              <a className={cx(pathname === '/projects' && styles.active)}>
                Projects
              </a>
            </Link>
          </li> */}
          <li>
            <Link href='/contacts'>
              <a className={cx(pathname === '/contacts' && styles.active)}>
                Contacts
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

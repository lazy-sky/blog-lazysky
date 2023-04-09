import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useClickAway } from 'react-use'
import cx from 'classnames'

import { FaceLogo, MenuIcon } from '../../assets/images'

import styles from './header.module.scss'

const menus = [
  { href: '/', text: 'Home' },
  { href: '/posts', text: 'Posts' },
  // { href: '/projects', text: 'Projects' },
  { href: '/contacts', text: 'Contacts' },
  { href: '/routines/readings', text: 'Readings' },
]

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
          {menus.map(({ href, text }) => (
            <li key={text}>
              <Link href={href}>
                <a className={cx(pathname === href && styles.active)}>{text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header

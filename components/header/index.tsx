import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <div>
        <Link href='/'>
          <a>로고 이미지</a>
        </Link>
      </div>
      <nav>
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
        </ul>
      </nav>
      <div>
        <div>Contacts</div>
        <a href='https://open.kakao.com/o/siQfK7ke'>Kakao</a>
        <a href='https://github.com/lazy-sky'>Github</a>
      </div>
    </header>
  )
}

export default Header

import Footer from '../footer'
import Header from '../header'

import styles from './layout.module.scss'

interface ILayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout

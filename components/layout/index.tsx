import Footer from '../footer'
import Header from '../header'

interface ILayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout

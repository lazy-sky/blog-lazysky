import BackButton from './backButton'
import styles from './pageHeader.module.scss'

interface IPageHeader {
  title: string
  hasBackBtn?: boolean
  children?: React.ReactNode
}

const PageHeader = ({ title, hasBackBtn, children }: IPageHeader) => {
  return (
    <div className={styles.pageHeader}>
      {hasBackBtn && (
        <div className={styles.backBtn}>
          <BackButton />
        </div>
      )}
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.children}>{children}</div>
    </div>
  )
}

export default PageHeader

import { useHeadingsData } from 'hooks'

import styles from './tableOfContents.module.scss'

const TableOfContents = () => {
  const { nestedHeadings } = useHeadingsData()

  return (
    <aside aria-label='Table of contents' className={styles.container}>
      <nav className={styles.tableOfContents}>
        <ul className={styles.heading3}>
          {nestedHeadings.map((heading) => (
            <li key={heading.id}>
              <a href={`#${heading.id}`}>{heading.title}</a>
              {heading.items.length > 0 && (
                <ul className={styles.heading4}>
                  {heading.items.map((child: any) => (
                    <li key={child.id}>
                      <a href={`#${child.id}`}>{child.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default TableOfContents

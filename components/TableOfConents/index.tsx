import { useEffect, useState } from 'react'
import styles from './tableOfContents.module.scss'

const TableOfContents = () => {
  const getNestedHeadings = (headingElements: any) => {
    const nestedHeadings: any[] = []

    headingElements.forEach((heading: any) => {
      const { innerText: title, id } = heading

      if (heading.nodeName === 'H3') {
        nestedHeadings.push({ id, title, items: [] })
      } else if (heading.nodeName === 'H4' && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title,
        })
      }
    })

    return nestedHeadings
  }

  const useHeadingsData = () => {
    const [nestedHeadings, setNestedHeadings] = useState<any[]>([])

    useEffect(() => {
      // TODO: 각 소제목마다 동적으로 id부여, 썩 마음에 드는 방법은 아님, 리팩토링 필요
      ;(document.querySelectorAll('h3, h4') as NodeListOf<HTMLElement>).forEach(
        (heading) => {
          heading.setAttribute('id', heading.innerText)
        }
      )
      const headingElements = Array.from(document.querySelectorAll('h3, h4'))
      const newNestedHeadings = getNestedHeadings(headingElements)
      setNestedHeadings(newNestedHeadings)
    }, [])

    return { nestedHeadings }
  }

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

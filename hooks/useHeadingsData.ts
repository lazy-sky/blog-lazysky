import { useEffect, useState } from 'react'

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

export default useHeadingsData

import { useEffect, useState } from 'react'

interface IHeading {
  id: string
  title: string
  items: IHeading[]
}

export const getNestedHeadings = (headingElements: HTMLElement[]) => {
  const nestedHeadings: IHeading[] = []

  headingElements.forEach(({ innerText, nodeName }) => {
    if (nodeName === 'H2') {
      nestedHeadings.push({ id: innerText, title: innerText, items: [] })
    } else if (nodeName === 'H3' && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id: innerText,
        title: innerText,
        items: [],
      })
    }
  })

  return nestedHeadings
}

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState<IHeading[]>([])

  useEffect(() => {
    // TODO: 각 소제목마다 동적으로 id부여, 썩 마음에 드는 방법은 아님, 리팩토링 필요
    ;(document.querySelectorAll('h2, h3') as NodeListOf<HTMLElement>).forEach(
      (heading) => {
        heading.setAttribute('id', heading.innerText)
      }
    )
    const headingElements = Array.from(document.querySelectorAll('h2, h3'))
    const newNestedHeadings = getNestedHeadings(
      headingElements as HTMLElement[]
    )
    setNestedHeadings(newNestedHeadings)
  }, [])

  return { nestedHeadings }
}

export default useHeadingsData

import { useState } from 'react'
import cx from 'classnames'

import styles from './tags.module.scss'

interface ITagsProps {
  tags: (string | number | undefined)[][]
  selectedTags: string[]
  handleTagClick: (tag: string) => void
}

const Tags = ({ tags, selectedTags, handleTagClick }: ITagsProps) => {
  const [isFolded, setIsFolded] = useState(true)

  const handleTagsFoldToggle = () => {
    setIsFolded((prev) => !prev)
  }

  if (!tags) return null

  return (
    <>
      <button
        type='button'
        onClick={handleTagsFoldToggle}
        className={styles.foldBtn}
      >
        {isFolded ? <span>태그 펼치기 &#709;</span> : <span>닫기 &#708;</span>}
      </button>
      <ul className={cx(styles.tags, !isFolded && styles.folded)}>
        {tags.map(([tagName, count]) => (
          <li key={tagName}>
            <button
              type='button'
              onClick={() => handleTagClick(String(tagName))}
              className={cx(
                styles.tag,
                selectedTags.includes(String(tagName)) && styles.selected
              )}
            >
              {tagName} ({count})
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Tags

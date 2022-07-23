import cx from 'classnames'

import styles from './tags.module.scss'

interface ITagsProps {
  tags: (string | number | undefined)[][]
  selectedTags: string[]
  handleTagClick: (tag: string) => void
}

const Tags = ({ tags, selectedTags, handleTagClick }: ITagsProps) => {
  return (
    <ul className={styles.tags}>
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
  )
}

export default Tags

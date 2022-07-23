import styles from './tags.module.scss'

interface ITagsProps {
  tags: (string | number | undefined)[][]
}

const Tags = ({ tags }: ITagsProps) => {
  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={tag[0]}>
          <button type='button' className={styles.tag}>
            {tag[0]} ({tag[1]})
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Tags

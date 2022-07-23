import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'

import IPost from 'types/post'

import styles from './postPreview.module.scss'

interface IPostPreivewProps {
  post: IPost
}

const PostPreview = ({ post }: IPostPreivewProps) => {
  const { title, coverImage, date, excerpt, slug, tags } = post

  return (
    <li>
      <Link as={`/posts/${slug}`} href='/posts/[slug]'>
        <a>
          <div className={styles.postPreview}>
            <Image
              priority
              src={coverImage}
              alt={`Cover Image for ${title}`}
              width='100%'
              height='100%'
              objectFit='contain'
              className={styles.coverImage}
            />
            <div>
              <ul className={styles.tags}>
                {tags?.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
              <h3 className={styles.title}>{title}</h3>
              <time dateTime={date} className={styles.createdAt}>
                {dayjs(date).format('YYYY / MM / DD')}
              </time>
              <p className={styles.excerpt}>{excerpt}</p>
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default PostPreview

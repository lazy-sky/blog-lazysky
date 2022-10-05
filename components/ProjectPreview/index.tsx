/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import { useRouter } from 'next/router'
import cx from 'classnames'

import { IProject } from 'types/notionData'

import styles from './projectPreview.module.scss'

interface IPostPreivewProps {
  project: IProject
}

const ProjectPreview = ({ project }: IPostPreivewProps) => {
  const router = useRouter()
  const {
    id,
    properties: { Name, Tags, Photo, Tech },
  } = project

  const title = Name.title[0].plain_text
  const photoUrl = Photo.files[0].file.url
  const tags = Tags.multi_select
  const techs = Tech.multi_select

  const handleClick = () => {
    router.push(`/projects/${id}`)
  }

  return (
    <li key={id} className={styles.projectPreview}>
      <button type='button' onClick={handleClick}>
        <div className={styles.coverImage}>
          {/* TODO: */}
          {/* <Image
            priority
            src={photoUrl}
            width={200}
            height={200}
            layout='responsive'
            objectFit='contain'
            alt='프로젝트 대표 사진'
          /> */}
          <img src={photoUrl} alt='프로젝트 대표 사진' />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag.id} className={styles.tag}>
                {tag.name}
              </li>
            ))}
          </ul>
          <ul className={styles.tags}>
            {techs.map((tag) => (
              <li key={tag.id} className={cx(styles.tech, styles.tag)}>
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
      </button>
    </li>
  )
}

export default ProjectPreview

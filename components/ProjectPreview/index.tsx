import Link from 'next/link'
import Image from 'next/image'
import cx from 'classnames'

import { IProject } from 'types/notionData'

import styles from './projectPreview.module.scss'

interface IPostPreivewProps {
  project: IProject
}

const ProjectPreview = ({ project }: IPostPreivewProps) => {
  const {
    id,
    properties: { Name, Code, Tags, Photo, Tech, Deploy },
  } = project

  return (
    <li key={id} className={styles.projectPreview}>
      <Image
        priority
        src={Photo.files[0].file.url}
        height={100}
        width={100}
        layout='responsive'
        objectFit='cover'
        alt='프로젝트 대표 사진'
      />
      <div className={styles.info}>
        <h3 className={styles.projectName}>{Name.title[0].plain_text}</h3>
        <ul className={styles.tags}>
          {Tags.multi_select.map((tag) => (
            <li key={tag.id} className={styles.tag}>
              {tag.name}
            </li>
          ))}
        </ul>
        <ul className={styles.tags}>
          {Tech.multi_select.map((tag) => (
            <li key={tag.id} className={cx(styles.tech, styles.tag)}>
              {tag.name}
            </li>
          ))}
        </ul>
        <div className={styles.links}>
          <a href={Deploy.url} target='_blank' rel='noreferrer'>
            Deploy
          </a>
          <a
            href={Code.rich_text[0].plain_text}
            target='_blank'
            rel='noreferrer'
          >
            Codes
          </a>
        </div>
        <div>
          <Link as={`/projects/${1}`} href='/projects/[slug]'>
            <a>자세히 보기</a>
          </Link>
        </div>
      </div>
    </li>
  )
}

export default ProjectPreview

import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

const postsDirectory = join(process.cwd(), '_posts')
const projectsDirectory = join(process.cwd(), '_projects')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getProjectSlugs() {
  return fs.readdirSync(projectsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const slugName = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${slugName}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slugName
    }

    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getProjectBySlug(slug: string, fields: string[] = []) {
  const slugName = slug.replace(/\.md$/, '')
  const fullPath = join(projectsDirectory, `${slugName}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slugName
    }

    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  return posts
}

export function getAllProjects(fields: string[] = []) {
  const slugs = getProjectSlugs()
  const posts = slugs
    .map((slug) => getProjectBySlug(slug, fields))
    .sort((project1, project2) => (project1.date > project2.date ? -1 : 1))

  return posts
}

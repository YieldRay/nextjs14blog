import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import { parseDate, parseMarkdown } from "./parser"
import { cacheAsync } from "./decorator"

export interface Post {
    id: string
    title: string
    content: string
    date: number
    update?: number
    tags?: string[]
    categories?: string[]
}

export const postsDirectory = path.join(process.cwd(), "_posts")

async function getAllIds() {
    const files = (await fs.readdir(postsDirectory)).filter((file) =>
        file.endsWith(".md"),
    )
    return files.map((file) => file.replace(/\.md$/, ""))
}

export async function getPostById(id: string) {
    const filepath = path.join(postsDirectory, `${id}.md`)
    const gmMarkdown = await fs.readFile(filepath, "utf-8")
    const { data, content } = matter(gmMarkdown)

    const fileStat = await fs.stat(filepath)
    const date = Reflect.has(data, "date")
        ? parseDate(data.date)
        : fileStat.birthtimeMs
    const update = Reflect.has(data, "update")
        ? parseDate(data.update)
        : fileStat.atimeMs
    const title = Reflect.has(data, "title") ? data.title : id

    return { ...data, id, title, date, update, content } as Post
}

export function parsePostContentToHTML(content: string) {
    const html = parseMarkdown(content)
    return html
}

export async function getAllPosts() {
    const ids = await getAllIds()
    const all = await Promise.all(ids.map(getPostById))
    return all.sort((a, b) => b.date - a.date)
}

export const getAllCachedPosts = cacheAsync(getAllPosts)

export async function getTags() {
    const posts = await getAllCachedPosts()

    const tags: Record<string, Post[]> = {}

    for (const post of posts) {
        if (!post.tags) continue
        for (const tag of post.tags) {
            if (tags[tag]) {
                tags[tag].push(post)
            } else {
                tags[tag] = [post]
            }
        }
    }

    return tags
}

export async function getArchives() {
    const posts = await getAllCachedPosts()

    const archive: Record<string, Post[]> = {}

    for (const post of posts) {
        const date = new Date(post.date)
        const year = date.getFullYear()
        if (archive[year]) {
            archive[year].push(post)
        } else {
            archive[year] = [post]
        }
    }
    return archive
}

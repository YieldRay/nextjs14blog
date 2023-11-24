import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import { parseMarkdown } from "./markdownParser"
import { cacheAsync } from "./decorator"
import { z } from "zod"

export interface Post {
    id: string
    title: string
    content: string
    date: Date
    update: Date
    tags: string[]
    categories: string[]
}

export const postsDirectory = path.join(process.cwd(), "_posts")

async function getAllIds() {
    const files = (await fs.readdir(postsDirectory)).filter((file) =>
        file.endsWith(".md")
    )
    return files.map((file) => file.replace(/\.md$/, ""))
}

export async function getPostById(id: string): Promise<Post> {
    const filepath = path.join(postsDirectory, `${id}.md`)
    const gmMarkdown = await fs.readFile(filepath, "utf-8")
    const { data, content } = matter(gmMarkdown)
    const fileStat = await fs.stat(filepath)

    const gmSchema = z.object({
        title: z.string().default(id),
        date: z.coerce.date().default(() => new Date(fileStat.birthtimeMs)),
        update: z.coerce.date().default(() => new Date(fileStat.atimeMs)),
        tags: z.array(z.string()).default([]),
        categories: z.array(z.string()).default([]),
    })

    const parsed = gmSchema.parse(data)
    const post = { id, content, ...parsed }


    return post
}

export function parsePostContentToHTML(content: string) {
    const html = parseMarkdown(content)
    return html
}

export async function getAllPosts() {
    const ids = await getAllIds()
    const all = await Promise.all(ids.map(getPostById))
    return all.sort((a, b) => b.date.getTime() - a.date.getTime())
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

import "./vs2015.css"
import "./page.scss"

import {
    getAllPosts,
    getPostById,
    parsePostContentToHTML,
} from "@/utils/generate"
import Link from "next/link"
import Time from "@/components/Time"
import { Metadata, ResolvingMetadata } from "next"

export async function generateStaticParams() {
    const posts = await getAllPosts()

    return posts.map((post) => ({
        id: post.id,
    }))
}

export async function generateMetadata(
    { params }: { params: { id: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.id
    const post = await getPostById(id)

    return {
        title: post.title,
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    const post = await getPostById(params.id)
    const html = await parsePostContentToHTML(post.content)

    return (
        <>
            <article >
                <section className="py-4">
                    <h1 className="py-8 text-center mx-auto">{post.title}</h1>

                    <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center whitespace-nowrap">
                            <Clock /> <Time date={post.date} />
                        </div>
                        <div className="flex items-center whitespace-nowrap">
                            <Tag />
                            <span className="inline-block max-w-[600px] overflow-x-auto">
                                {post.tags?.map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/tags/${tag}`}
                                        className="hover:underline mr-1"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </span>
                        </div>
                    </div>
                </section>

                <section  className="blog-article" dangerouslySetInnerHTML={{ __html: html }}></section>
            </article>
        </>
    )
}

function Clock() {
    return (
        <svg
            className="scale-75 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
            <path d="M12 7l0 5l3 3"></path>
        </svg>
    )
}

function Tag() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="scale-75 inline-block"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx="8.5" cy="8.5" r="1" fill="currentColor"></circle>
            <path d="M4 7v3.859c0 .537 .213 1.052 .593 1.432l8.116 8.116a2.025 2.025 0 0 0 2.864 0l4.834 -4.834a2.025 2.025 0 0 0 0 -2.864l-8.117 -8.116a2.025 2.025 0 0 0 -1.431 -.593h-3.859a3 3 0 0 0 -3 3z"></path>
        </svg>
    )
}

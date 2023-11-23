import { getArchives } from "@/utils/generate"
import Link from "next/link"
import { Fragment } from "react"

export default async function Page() {
    const archives = await getArchives()

    return (
        <>
            {Object.entries(archives)
                .reverse()
                .map(([year, posts]) => (
                    <Fragment key={year}>
                        <h2>{year}</h2>
                        <ul>
                            {posts.map((post) => (
                                <li key={post.id}>
                                    <Link
                                        href={`/posts/${post.id}/`}
                                        className="hover:underline"
                                    >
                                        {post.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Fragment>
                ))}
        </>
    )
}

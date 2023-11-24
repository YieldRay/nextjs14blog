import { siteTitle, description } from "@/app/config"
import { getTags } from "@/utils/generate"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: `Tags | ${siteTitle}`,
    description,
}

export default async function Page() {
    const tags = await getTags()

    return (
        <>
            <ul>
                {Object.entries(tags).map(([tag, posts]) => (
                    <li key={tag}>
                        <Link
                            href={`/tags/${tag}/`}
                            className="inline-flex gap-2"
                        >
                            <span className="hover:underline">{tag}</span>
                            <small>({posts.length})</small>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}
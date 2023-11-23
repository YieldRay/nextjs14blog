import { getTags } from "@/utils/generate"
import PostsList from "@/components/PostsList"

export async function generateStaticParams() {
    const tags = await getTags()

    return Object.keys(tags).map((tag) => ({
        tag,
    }))
}

export default async function Page({ params }: { params: { tag: string } }) {
    const tags = await getTags()
    const posts = tags[params.tag]

    return (
        <>
            <h2>Tag: {params.tag}</h2>
            <PostsList posts={posts} />
        </>
    )
}

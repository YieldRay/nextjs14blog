import { getAllPosts } from "@/utils/generate"
import PostsList from "@/components/PostsList"

export default async function Home() {
    const posts = await getAllPosts()
    return (
        <>
            <section className="py-2 font-sans">
                <h2>Blog</h2>
                <PostsList posts={posts} />
            </section>
        </>
    )
}

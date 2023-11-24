import { getAllPosts } from "@/utils/generate"
import PostsList from "@/components/PostsList"

export default async function Home() {
    const posts = await getAllPosts()
    return (
        <>
            <main className="max-w-[767px] container px-4 mx-auto">
                <section className="py-2 font-sans">
                    <h2>Blog</h2>
                    <PostsList posts={posts} />
                </section>
            </main>
        </>
    )
}

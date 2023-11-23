import { Post } from "@/utils/generate"
import Link from "next/link"
import Time from "./Time"

export default function PostsList({ posts }: { posts: Post[] }) {
    return (
        <ul className="my-1 flex flex-col gap-2">
            {posts.map(({ id, date, title }) => (
                <li key={id}>
                    <Link href={`/posts/${id}/`} className="flex flex-col">
                        <span className="hover:underline">{title}</span>
                        <small className="text-sm">
                            <Time timestamp={date} />
                        </small>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

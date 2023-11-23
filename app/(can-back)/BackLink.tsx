import Link from "next/link"

export default function BackLink({
    href = "/",
    children = "Back to home",
}: {
    href?: string
    children?: React.ReactNode
}) {
    return (
        <Link href={href} className="group inline-flex relative">
            <div className="relative inline-block">
                <div className="absolute box-border bottom-0 left-0 -z-10 w-full bg-[#66ccff] h-[2px] transition-[height] group-hover:h-full group-hover:p-2"></div>
                <span className="transition -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 absolute -left-4">
                    ←
                </span>
                <span>{children}</span>
            </div>
        </Link>
    )
}

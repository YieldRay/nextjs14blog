import clsx from "clsx"

export default function MainContainer({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <main className={clsx("container px-4 mx-auto", className)}>
            {children}
        </main>
    )
}

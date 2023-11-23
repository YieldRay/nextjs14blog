import BackLink from "./BackLink"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <section className="mt-8 mb-2">
                <BackLink />
            </section>
        </>
    )
}

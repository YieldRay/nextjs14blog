import BackLink from "@/components/BackLink"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="container px-4 mx-auto">
            {children}
            <section className="mt-8 mb-2">
                <BackLink />
            </section>
        </main>
    )
}
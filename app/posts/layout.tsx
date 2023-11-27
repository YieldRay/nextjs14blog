import BackLink from "@/components/BackLink"
import Waline from "@/components/Waline"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="container px-4 mx-auto">
            {children}
            <section className="mt-8 mb-2">
                <BackLink />
            </section>
            <section className="max-w-[767px] py-4">
                <Waline />
            </section>
        </main>
    )
}

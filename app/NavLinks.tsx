"use client"

import { useEffect, useState } from "react"
import FancyButton from "@/components/FancyButton"
import { usePathname } from "next/navigation"
import { pages } from "@/app/config"
import Link from "next/link"

export default function NavLink() {
    "use client"
    const pathname = usePathname()
    const equal = (a: string, b: string) =>
        a.replace(/\/$/, "") === b.replace(/\/$/, "")
    return (
        <nav className="flex justify-center items-center gap-2">
            {pages.map(([name, href]) => (
                <Link key={href} href={href}>
                    <FancyButton active={equal(pathname, href)}>
                        {name}
                    </FancyButton>
                </Link>
            ))}
            <DarkModeButton />
        </nav>
    )
}

export function DarkModeButton() {
    "use client"
    const localStorage = globalThis.localStorage
    const document = globalThis.document
    const [dark, setDark] = useState(localStorage?.getItem("dark") === "true")
    useEffect(() => {
        if (localStorage?.getItem("dark") === "true") {
            document.documentElement.classList.add("dark")
        }
    }, [])
    return (
        <FancyButton
            active={dark}
            onClick={() => {
                const to = !document.documentElement.classList.contains("dark")
                document.documentElement.classList.toggle("dark")
                setDark(to)
                localStorage?.setItem("dark", to.toString())
            }}
        >
            Darkmode
        </FancyButton>
    )
}

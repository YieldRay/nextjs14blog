"use client"

import { useState } from "react"
import FancyButton from "@/components/FancyButton"
import { usePathname } from "next/navigation"
import { pages } from "@/app/config"
import Link from "next/link"
import usePrefersColorScheme from "use-prefers-color-scheme"

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

function useTheme() {
    const localStorage = globalThis.localStorage
    const document = globalThis.document
    const prefersColorScheme = usePrefersColorScheme()
    const [isThemeDark, setThemeDark] = useState(
        prefersColorScheme === "dark" ||
            localStorage?.getItem("theme") === "dark",
    )
    const syncClassName = (isDark: boolean) => {
        if (!document) return
        if (isDark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }
    syncClassName(isThemeDark)
    const $setThemeDark = () => {
        setThemeDark(true)
        syncClassName(true)
    }
    const $setThemeLight = () => {
        setThemeDark(false)
        syncClassName(false)
    }
    return {
        isThemeDark,
        setThemeDark: $setThemeDark,
        setThemeLight: $setThemeLight,
    }
}

export function DarkModeButton() {
    "use client"
    const { isThemeDark, setThemeDark, setThemeLight } = useTheme()
    return (
        <FancyButton
            active={isThemeDark}
            onClick={() => {
                if (isThemeDark) {
                    setThemeLight()
                } else {
                    setThemeDark()
                }
            }}
        >
            Darkmode
        </FancyButton>
    )
}

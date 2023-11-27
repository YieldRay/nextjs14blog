"use client"

import { useEffect } from "react"

function getAllArticleHeadings() {
    return Array.from(document.querySelectorAll(".markdown-body a.anchor")).map(
        (anchor) => anchor.parentElement! as HTMLHeadingElement,
    )
}

function associateActiveHeadingWithTOC() {
    const headings = getAllArticleHeadings()

    const activeHeading = headings
        .map((h) => ({ h, y: h.getBoundingClientRect().y }))
        .filter(({ y }) => y <= 0)
        .sort((a, b) => b.y - a.y)
        .at(0)?.h

    if (activeHeading) {
        const id = activeHeading.id

        activeById(id)
    }
}

function activeById(id: string) {
    document
        .querySelectorAll("ul.table-of-contents > li")
        .forEach((li) => li.classList.remove("active"))

    Array.from(
        // in case the browser does not support CSS :has() selector
        document.querySelectorAll(
            `ul.table-of-contents > li > a[href="#${CSS.escape(id)}"]`,
        ),
    )
        .map((a) => a.parentElement!)
        .forEach((li) => li.classList.add("active"))
}

/**
 * returns unlisten so we can use it in React.useEffect easily
 */
export function listen() {
    if (location.hash) {
        activeById(decodeURIComponent(location.hash.slice(1)))
    } else {
        associateActiveHeadingWithTOC()
    }

    const headings = getAllArticleHeadings()
    const io = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    associateActiveHeadingWithTOC()
                }
            }
        },
        { threshold: [0, 0.5, 1] },
    )
    headings.forEach((h) => io.observe(h))

    return () => io.disconnect()
}

export function ListenComponent() {
    useEffect(() => {
        return listen()
    }, [])

    return false
}

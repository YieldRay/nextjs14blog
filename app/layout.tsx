import "./globals.css"
import "./github-markdown.scss"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { profileImage, name, siteTitle, description } from "@/app/config"
import NavLinks from "./NavLinks"

export const metadata: Metadata = {
    title: siteTitle,
    description,
    openGraph: {
        images: `https://og-image.vercel.app/${encodeURI(
            siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <header>
                    <Avatar />
                    <NavLinks />
                </header>
                {children}
            </body>
        </html>
    )
}

function Avatar() {
    return (
        <div className="py-2 flex items-center justify-center">
            <Link href="/">
                <div className="transition duration-500 hover:scale-105">
                    <Image
                        priority
                        src={profileImage}
                        height={144}
                        width={144}
                        alt={name}
                        className="rounded-full"
                    />
                </div>
                <h3 className="font-mono text-center text-gray-900 dark:text-gray-300 no-underline">
                    {name}
                </h3>
            </Link>
        </div>
    )
}

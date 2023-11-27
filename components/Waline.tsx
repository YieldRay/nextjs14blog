"use client"

import { usePathname } from "next/navigation"
import React, { useEffect, useRef } from "react"
import {
    type WalineInstance,
    type WalineInitOptions,
    init,
} from "@waline/client"

import "@waline/client/dist/waline.css"

export type WalineOptions = Omit<WalineInitOptions, "el" | "serverURL"> & {
    path?: string
    serverURL?: string
}

/**
 * my default waline instance url
 */
const serverURL = "https://waline.488848.xyz"

export const Waline = (props: WalineOptions) => {
    // props.serverURL ??= ""
    const walineInstanceRef = useRef<WalineInstance | null>(null)
    const containerRef = React.createRef<HTMLDivElement>()
    const path = usePathname()

    useEffect(() => {
        walineInstanceRef.current = init({
            path,
            serverURL,
            dark: "html.dark",
            ...props,
            el: containerRef.current,
        })

        return () => walineInstanceRef.current?.destroy()
    }, [])

    useEffect(() => {
        walineInstanceRef.current?.update(props)
    }, [props])

    return <div ref={containerRef} />
}
export default Waline

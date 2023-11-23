import { Marked } from "marked"
import { markedHighlight } from "marked-highlight"
import hljs from "highlight.js"

export function parseDate(date: string): number {
    const t = Date.parse(date)
    if (Number.isNaN(t)) {
        throw new Error(`Fail to parse date: ${date}`)
    }
    return t
}

const marked = new Marked(
    markedHighlight({
        langPrefix: "hljs language-",
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext"
            return hljs.highlight(code, { language }).value
        },
    }),
)

export function parseMarkdown(md: string): string {
    return marked.parse(md) as string
}

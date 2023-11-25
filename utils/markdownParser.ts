import { Marked, type MarkedExtension } from "marked"
import { markedHighlight } from "marked-highlight"
import markedAlert from "marked-alert"
import hljs from "highlight.js"
import GithubSlugger from "github-slugger"

function gfmHeadings(): MarkedExtension {
    const slugger = new GithubSlugger()
    const headings: { id: string; text: string; level: number }[] = []

    return {
        renderer: {
            heading(innerHTML: string, level: number) {
                const text = innerHTML.replace(/(<([^>]+)>)/gi, "").trim()
                const id = slugger.slug(text)

                const html = `
              <h${level} id="${id}">
                <a class="anchor" href="#${id}">
                  <div class="octicon octicon-link"></div>
                </a>
                ${innerHTML}
              </h${level}>`
                headings.push({ id, text, level })
                return html
            },
        },
        hooks: {
            preprocess: (x) => x,
            postprocess(html) {
                // hide if no headings
                if (headings.length === 0) return html

                const tableOfContents = `<ul class="table-of-contents">${headings
                    .map(
                        ({ id, text, level }) =>
                            `<li>${"&nbsp;".repeat(
                                (level - 1) * 2,
                            )}<a href="#${id}" class="h${level}">${text}</a></li>`,
                    )
                    .join("\n")}</ul>`

                const tableOfContentsNormal = `<aside class="table-of-contents-normal"><div><strong>Table Of Contents</strong>${tableOfContents}</div></aside>`

                const tableOfContentsFloating = `<aside class="table-of-contents-floating"><details><summary>Table Of Contents</summary>${tableOfContents}</details></aside>`

                return `<aside class="markdown-body">${html}</aside> ${tableOfContentsNormal} ${tableOfContentsFloating}`
            },
        },
    }
}

export async function parseMarkdown(md: string): Promise<string> {
    const marked = new Marked(
        markedHighlight({
            langPrefix: "hljs language-",
            highlight(code, lang) {
                const language = hljs.getLanguage(lang) ? lang : "plaintext"
                return hljs.highlight(code, { language }).value
            },
        }),
    )
        .use({
            async: true,
            pedantic: false,
            gfm: true,
        })
        .use(gfmHeadings())
        .use(markedAlert())

    return marked.parse(md)
}

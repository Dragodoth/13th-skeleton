import type {MarkdownPage} from "$lib/types.ts";

export async function load({ params, fetch }) {
        const response = await fetch('/api/pages');

        const pages = await response.json();
        const page = pages.find((p: MarkdownPage) => p.path.endsWith(`/${params.page}.md`));
        return {
                content: page.content
        };
}
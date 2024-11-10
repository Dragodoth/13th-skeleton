import type {MarkdownPage} from "$lib/types.ts";

export async function load({ params, fetch }) {
        const response = await fetch('/api/pages');

        const pages = await response.json();
        //console.log(pages);
        const page = pages.find((p: MarkdownPage) => p.path.endsWith(`/${params.page}`));

        console.log('page', page);

        return {
                content: page.content || 'Page not found'
        };
}
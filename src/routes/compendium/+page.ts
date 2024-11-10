import type {MarkdownPage} from "$lib/types.ts";

export const load = async ({ fetch }) => {
    const response = await fetch(`/api/pages`);
    const pages = await response.json();

    const page = pages.find((p: MarkdownPage) => p.path.endsWith(`/13th-Age-Index.md`));
    return {
        page,
    };
};

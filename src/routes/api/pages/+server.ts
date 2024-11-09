import { fetchMarkdownPages } from '$lib';
import { json } from '@sveltejs/kit';

export const GET = async () => {
    const allPages = await fetchMarkdownPages();
   // console.log(allPages);
    return json(allPages);
};
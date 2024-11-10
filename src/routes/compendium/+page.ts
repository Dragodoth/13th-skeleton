import type { MarkdownPage } from "$lib/types.ts";

export const load = async ({ fetch }) => {
    const response = await fetch(`/api/pages`);
    const pages = await response.json();

    type FolderStructure = {
        [key: string]: FolderStructure | { path: string };
    };

    const folderStructure: FolderStructure = {};

    pages.forEach((page: MarkdownPage) => {
        //console.log(page.path);
        const pagePath = page.path.slice('/compendium'.length);
        console.log(pagePath);
        const pathArray = pagePath.split('/').slice(1);
        let currentFolder: FolderStructure = folderStructure;

        pathArray.forEach((folder: string) => {
            if (!currentFolder[folder]) {
                currentFolder[folder] = {path: pagePath}; // Just create an empty object for the folder
            }
            currentFolder = currentFolder[folder] as FolderStructure;
        });
    });

    return {
        pages,
        folderStructure,
    };
};

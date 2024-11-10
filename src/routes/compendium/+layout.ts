import type {FolderStructureType, MarkdownPage} from "$lib/types.ts";

export const load = async ({fetch}) => {
    const response = await fetch(`/api/pages`);
    const pages = await response.json();

    const folderStructure: FolderStructureType = {};

    pages.forEach((page: MarkdownPage) => {
        // Remove '/compendium' from the start of the path
        const pagePath = page.path.slice('/compendium'.length);

        // Split the path and slice off the leading empty string if present
        const pathArray = pagePath.split('/').slice(1);

        let currentFolder: FolderStructureType = folderStructure;

        pathArray.forEach((folder: string, index: number) => {
            // Check if it's the last element and ends with '.md'
            if (index === pathArray.length - 1 && folder.endsWith('.md')) {
                // Store the .md file path in the current folder
                currentFolder[folder] = page.path;
            } else {
                // Create folder structure
                if (!currentFolder[folder]) {
                    currentFolder[folder] = {};
                }
                currentFolder = currentFolder[folder] as FolderStructureType;
            }
        });
    });

    return {
        pages,
        folderStructure,
    };
};

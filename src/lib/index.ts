// place files you want to import through the `$lib` alias in this folder.
export const fetchMarkdownPages = async () => {
    const allPageFiles = import.meta.glob('$lib/data/13th-Age-SRD/compendium/**/*.md');
    const iterablePageFiles = Object.entries(allPageFiles);

    const allPosts = await Promise.all(
        iterablePageFiles.map(async ([path, resolver]) => {
            const resolvedModule = await resolver() as any;
            const metadata = resolvedModule?.metadata || {};  // Default to an empty object if metadata is undefined
            const postPath = path.slice(34, -3);

            return {
                meta: metadata,
                path: postPath
            };
        })
    );
    console.log(allPosts);

    return allPosts;
};
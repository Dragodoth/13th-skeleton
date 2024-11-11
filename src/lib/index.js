import matter from 'gray-matter';

export const fetchMarkdownPages = async () => {
    const allPageFiles = import.meta.glob('$lib/data/13th-Age-SRD/compendium/**/*.md', {
        query: '?raw',
        import: 'default'
    });

    const iterablePageFiles = Object.entries(allPageFiles);

    return await Promise.all(
        iterablePageFiles.map(async ([path, resolver]) => {
            const markdownContent = await resolver();

            const { data: metadata, content } = matter(markdownContent);

            const pagePath = path.slice('/src/lib/data/13th-Age-SRD'.length);

            return {
                meta: metadata,
                content: content,
                path: pagePath,
            };
        })
    );
};

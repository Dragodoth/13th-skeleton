import type { SvelteComponent } from 'svelte'

export const fetchMarkdownPages = async () => {
    // Import all Markdown files from the specified directory
    const allPageFiles = import.meta.glob('$lib/data/13th-Age-SRD/compendium/**/*.md');

    // Convert object entries into an iterable array
    const iterablePageFiles = Object.entries(allPageFiles);

    // Fetch and process each Markdown file
    return await Promise.all(
        iterablePageFiles.map(async ([path, resolver]) => {
            // Dynamically import the module
            const resolvedModule = await resolver() as {
                metadata: Record<string, unknown>;
                default: SvelteComponent;
            };;

            const metadata = resolvedModule.metadata;
            const content = resolvedModule.default;

            // Generate a clean path for each post (adjust slice as needed)
            const pagePath = path.slice('/src/lib/data/13th-Age-SRD/compendium'.length, -3);

            return {
                meta: metadata,
                content: content,
                path: pagePath,
            };
        })
    );
};

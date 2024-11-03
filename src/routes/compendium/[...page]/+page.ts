export async function load({ params }) {
        // Use import.meta.glob to fetch all Markdown files
        const allPosts = import.meta.glob('$lib/data/13th-Age-SRD/compendium/**/*.md');

        // Construct the path to the file using the params.page
        const filePath = Object.keys(allPosts).find(path => path.endsWith(`/${params.page}.md`));

        // If the file was not found, throw an error
        if (!filePath) {
                throw new Error(`Page ${params.page} not found`);
        }

        // Dynamically import the specific Markdown file
        const post = await allPosts[filePath]();
        // Access the default export (content) of the Markdown file
        const content = post.default;

        // Return the content and metadata
        return {
                content
        };
}

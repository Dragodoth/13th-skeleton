<script lang="ts">
    import FolderStructure from "$lib/components/FolderStructure.svelte";
    import type { FolderStructureType, MarkdownPage } from "$lib/types.ts";
    import { AccordionItem } from "@skeletonlabs/skeleton";

    interface Props {
        folderStructure: FolderStructureType | string;
    }

    const { folderStructure }: Props = $props();

    // Helper function to sort folder structure: folders first, then .md files
    function sortFolderStructure(structure: FolderStructureType | string) {
        // If the structure is a .md file (a string), return it as-is (no further processing)
        if (typeof structure === "string") {
            return structure;
        }

        // Sort entries at the current level: folders first, then .md files
        return Object.entries(structure)
            .sort(([a], [b]) => {
                const isAFile = a.includes(".md");
                const isBFile = b.includes(".md");

                // If a is a .md file and b is a folder, place b first (folders first)
                if (isAFile && !isBFile) return 1;
                // If b is a .md file and a is a folder, place a first (folders first)
                if (!isAFile && isBFile) return -1;
                return 0; // If both are the same type (either both .md or both folders), no change
            })
            .reduce((sorted, [key, value]) => {
                // If value is a folder (object), recurse into it to sort its contents
                sorted[key] = typeof value === 'object' && value !== null
                    ? sortFolderStructure(value) // Recursively sort the folder structure
                    : value;
                return sorted;
            }, {});
    }

    //console.log(folderStructure);
    // Sort the folder structure recursively
    const sortedFolderStructure = sortFolderStructure(folderStructure) as FolderStructureType;
    console.log(sortedFolderStructure);
</script>

{#each Object.entries(sortedFolderStructure) as [folderName, folderContent]}
    {#if folderName.includes(".md")}
        <!-- Display the .md file path directly -->
        <p class="p-2 px-4">{folderName.slice(0, -3)}</p>
    {:else}
        <AccordionItem>
            <svelte:fragment slot="summary">
                {folderName}
            </svelte:fragment>
            <svelte:fragment slot="content">
                {#each Object.entries(folderContent) as [childName, childContent]}
                    {#if childName.includes(".md")}
                        <!-- Display the .md file directly -->
                        <p class="p-2 px-4">{childName.slice(0, -3)}</p>
                    {:else}
                        <!-- Pass the folder structure recursively for non-.md entries -->
                        <FolderStructure folderStructure={childContent} />
                    {/if}
                {/each}
            </svelte:fragment>
        </AccordionItem>
    {/if}
{/each}

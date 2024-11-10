<script lang="ts">
    import FolderStructure from "$lib/components/FolderStructure.svelte";
    import {Accordion, AccordionItem} from "@skeletonlabs/skeleton";
    import type {MarkdownPage} from "$lib/types.ts";

    const {
        folderStructure,
    } = $props();


</script>

{#each Object.entries(folderStructure) as [folderName, folderContent]}
    {#if Object.keys(folderContent).length > 1}
        <!-- Folder has children, render as accordion -->
        <AccordionItem>
            <svelte:fragment slot="summary">
                {folderName}
            </svelte:fragment>
            <svelte:fragment slot="content">
                {#each Object.entries(folderContent) as [childName, childContent]}
                    {#if Object.keys(childContent).length > 1}
                        <!-- Child folder with children -->
                        <FolderStructure {childContent} />
                    {:else}
                        <!-- Child with a path (leaf node) - render as link -->
                        <p><a href={`compendium${childContent.path}`}>{childName}</a></p>
                    {/if}
                {/each}
            </svelte:fragment>
        </AccordionItem>
    {:else}
        <!-- Folder is a leaf node (only has path), render as link -->
        <p><a href={`compendium${folderContent.path}`}>{folderName}</a></p>
    {/if}
{/each}



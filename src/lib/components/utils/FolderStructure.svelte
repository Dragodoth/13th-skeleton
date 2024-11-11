<script lang="ts">
    import FolderStructure from "$lib/components/utils/FolderStructure.svelte";
    import type {FolderStructureType} from "$lib/types.ts";
    import {AccordionItem} from "@skeletonlabs/skeleton";

    interface Props {
        folderStructure: FolderStructureType | string;
    }

    const {
        folderStructure
    }: Props = $props();

</script>

{#each Object.entries(folderStructure).sort(([a], [b]) => {
    const isAFile = a.includes(".md");
    const isBFile = b.includes(".md");

    if (isAFile && !isBFile) return 1;
    if (!isAFile && isBFile) return -1;
    return 0;

}) as [folderName, folderContent]}
    {#if folderName.includes(".md")}
        <!-- Display the .md file path directly -->
        <p class="p-2 px-4"><a href={folderContent.toString().slice(0, -3)} class="link">{folderName.slice(0, -3)}</a></p>
    {:else}
        <AccordionItem >
            <svelte:fragment slot="summary">
                {folderName}
            </svelte:fragment>
            <svelte:fragment slot="content">
                <FolderStructure folderStructure={folderContent}/>
            </svelte:fragment>
        </AccordionItem>
    {/if}
{/each}

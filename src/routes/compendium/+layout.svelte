<script lang="ts">
    let { children, data } = $props();

    import FolderStructure from "$lib/components/utils/FolderStructure.svelte";
    import {Accordion} from "@skeletonlabs/skeleton";

    const folderStructure = $state(data.folderStructure);

</script>

<section class="grid grid-cols-[16rem_1fr] gap-4">
    <aside class="card p-2 sticky top-4 h-screen overflow-y-auto text-sm">
        <Accordion>
            <FolderStructure {folderStructure}/>
        </Accordion>
    </aside>
    <main class="card p-4">
        <article class="prose-base">
            {@render children()}
        </article>
    </main>
</section>

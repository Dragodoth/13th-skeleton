<script lang="ts">
    let { children, data } = $props();

    import FolderStructure from "$lib/components/FolderStructure.svelte";
    import {Accordion} from "@skeletonlabs/skeleton";

    const {
        folderStructure
    } = data;

</script>

<section class="grid grid-cols-2 md:grid-cols-[auto_1fr_auto] gap-4">
    <aside class="card p-2">
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


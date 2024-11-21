<script lang="ts">
    let { children, data } = $props();

    import FolderStructure from "$lib/components/utils/FolderStructure.svelte";
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";

    const folderStructure = $state(data.folderStructure);
</script>

<section class="grid md:grid-cols-[16rem_1fr] gap-4">
    <!--    w > md-->
    <aside
        class="card p-2 sticky top-4 h-screen overflow-y-auto text-sm hidden md:flex">
        <Accordion>
            <FolderStructure {folderStructure} />
        </Accordion>
    </aside>
    <!--    w < md-->
    <header class="card p-2 top-4 overflow-y-auto text-sm md:hidden">
        <Accordion>
            <AccordionItem>
                <svelte:fragment slot="summary">
                    Table of Contents
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <FolderStructure {folderStructure} />
                </svelte:fragment>
            </AccordionItem>
        </Accordion>
    </header>
    <main class="card p-4">
        {@render children()}
    </main>
</section>

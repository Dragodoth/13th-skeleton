<script lang="ts">
    import FolderStructure from "$lib/components/FolderStructure.svelte";
    import {Accordion, RecursiveTreeView} from "@skeletonlabs/skeleton";

    const {
        data
    } = $props();

    const {
        //pages,
        folderStructure
    } = data;
    console.log(folderStructure);

</script>
<section>
    <Accordion>
        <FolderStructure {folderStructure}/>
    </Accordion>
</section>

<!--<RecursiveTreeView nodes={folderStructure} />-->


<!--{#each pages as page}-->
<!--    <p><a href={page.path}>aliases:{page.meta?.aliases} tags:{page.meta?.tags}</a></p>-->
<!--{/each}-->
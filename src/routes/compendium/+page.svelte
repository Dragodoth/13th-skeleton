<script lang="ts">
    //import source from "$lib/data/13th-Age-SRD/13th-Age-Index.md";
    const {
        data
    } = $props();
</script>

{#each data.pages as page}
    <p><a href={page.path}>{page.meta?.aliases}</a></p>
{/each}


<!--<div class="prose-base">-->
<!--    <svelte:component this={source}/>-->
<!--</div>-->
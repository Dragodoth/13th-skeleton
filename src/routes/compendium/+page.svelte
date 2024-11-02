<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown';
    import source from "$lib/data/13th Age SRD/13th-Age-Index.md?raw";
</script>
<div class="prose-base">
    <SvelteMarkdown {source}/>
</div>
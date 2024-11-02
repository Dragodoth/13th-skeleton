<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown';
    import source from "/README.md?raw";
</script>
<div class="prose-base">
    <SvelteMarkdown {source}/>
</div>

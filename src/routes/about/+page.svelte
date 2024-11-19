<script lang="ts">
    import source from "/README.md?raw";
    import SvelteMarkdown from "svelte-markdown";
</script>
<div class="prose dark:prose-invert max-w-none lg:prose-lg">
    <SvelteMarkdown {source}/>
</div>

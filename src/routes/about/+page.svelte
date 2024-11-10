<script lang="ts">
    import source from "/README.md?raw";
    import SvelteMarkdown from "svelte-markdown";
</script>
<div class="prose-base">
    <SvelteMarkdown {source}/>
</div>

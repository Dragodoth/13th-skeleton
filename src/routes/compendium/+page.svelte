<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";

    const {
        data
    } = $props();
    const source = data.page.content;

</script>
<article class="prose dark:prose-invert max-w-none lg:prose-lg">
    <SvelteMarkdown {source}/>
</article>

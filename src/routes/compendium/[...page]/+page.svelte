<script>
    import SvelteMarkdown from "svelte-markdown";

    const {
        data
    } = $props();
    console.log(data)
    const source = data.content;
</script>

<article class="prose-base">
    <SvelteMarkdown {source}/>
</article>
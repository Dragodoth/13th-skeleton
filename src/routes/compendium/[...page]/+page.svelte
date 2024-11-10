<script>
    import SvelteMarkdown from "svelte-markdown";

    const {
        data
    } = $props();
    const source = data.content;
</script>

<SvelteMarkdown {source}/>
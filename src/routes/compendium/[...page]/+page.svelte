<script>
    import SvelteMarkdown from "svelte-markdown";

    const {
        data
    } = $props();
    const source = $derived(data.content);
</script>

<SvelteMarkdown {source}/>
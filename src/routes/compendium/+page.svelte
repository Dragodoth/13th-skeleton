<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";

    const {
        data
    } = $props();
    const source = data.page.content;

</script>

<SvelteMarkdown {source}/>
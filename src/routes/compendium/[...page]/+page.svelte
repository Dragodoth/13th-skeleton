<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";
    import Statblock from "$lib/components/manager/Statblock.svelte";
    import monstersSRD from "$lib/data/13th-Age-SRD/compendium/Bestiary/bestiarySRD.json";
    import type { Monster } from "$lib/types.ts";

    const { data } = $props();
    const source = $derived(data.content);
    const filename = $derived(data.path.split("/").slice(-1)[0].slice(0, -3));
    const monster: Monster | undefined = $derived(
        monstersSRD.find((monster) => monster.basename === filename),
    );
</script>

{#if monster && source.includes("```statblock")}
    <Statblock data={monster} />
{:else}
    <article class="prose dark:prose-invert max-w-none lg:prose-lg">
        <SvelteMarkdown {source} />
    </article>
{/if}

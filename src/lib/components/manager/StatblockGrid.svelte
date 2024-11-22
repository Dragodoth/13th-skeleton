<script lang="ts">
    import HPManager from "$lib/components/manager/HPManager.svelte";
    import Statblock from "$lib/components/manager/Statblock.svelte";
    import { type Enemy, isEnemy, type Monster } from "$lib/types.ts";
    import type { Snippet } from "svelte";

    interface Props {
        data: Enemy[] | Monster[];
        battleId?: string;
        children?: Snippet;
    }

    const { data, battleId, children }: Props = $props();
</script>

<section class="section grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {#each data as statblockData (statblockData.id)}
        <div class="card flex flex-col gap-2 items-end">
            <div class="card p-2 variant-ghost">
                {#if battleId && isEnemy(statblockData)}
                    <HPManager {battleId} enemy={statblockData} />
                {/if}
                <section class=" card p-4 w-full">
                    <Statblock data={statblockData} />
                </section>
            </div>
        </div>
    {/each}
    {#if children}
        {@render children()}
    {/if}
</section>

<script lang="ts">
    import {TabAnchor, TabGroup} from "@skeletonlabs/skeleton";
    import {battleStorage} from "$lib/stores";
    export let data;
    $: battleData = data.battleData;
</script>
{#if battleData}
    <section class="section">
        {#if $battleStorage.length > 0}
            <TabGroup justify="justify-center">
                {#each $battleStorage as battle}
                    <TabAnchor href="/{battle.id}">
                        {battle.name}
                    </TabAnchor>
                {/each}
            </TabGroup>
        {:else}
            No Battles stored!
        {/if}
    </section>

    <h1>Hello from slug {battleData.name}</h1>
{/if}
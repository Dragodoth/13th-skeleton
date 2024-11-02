<script lang="ts">
    import {TabAnchor, TabGroup} from "@skeletonlabs/skeleton";
    import {battles} from "$lib/stores";
    import Statblock from "$lib/components/manager/Statblock.svelte";
    import HPManager from "$lib/components/manager/HPManager.svelte";
    //export let data;

    const {
        data
    } = $props();


    let battleData = $derived(data.battleData);

</script>

{#if battleData}
    <section class="section">
        {#if $battles.length > 0}
            <TabGroup justify="justify-center">
                {#each $battles as battle}
                    <TabAnchor href="/manager/{battle.id}">
                        {battle.name}
                    </TabAnchor>
                {/each}
            </TabGroup>
        {:else}
            No Battles stored!
        {/if}
    </section>

    <section class="section grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {#each battleData.combatants as combatant (combatant.id)}
            <div class="card">
                <div class="flex justify-between items-baseline px-2">
                    <header class="card-header h2">{combatant.name}</header>
                    <span>{combatant.source} p.{combatant.page}</span>
                </div>
                <section class="card p-2 my-2 variant-ghost">
                    <HPManager battleId={battleData.id} combatantId={combatant.id}/>
                    <section class=" card p-4 w-full">
                        <Statblock {combatant}/>
                    </section>
                </section>
            </div>
        {/each}
        <div class="card hover:variant-ghost-secondary flex justify-center items-center">
            <i class="fa-solid fa-plus fa-10x" style="color: rgba(var(--color-surface-500));"></i>
        </div>
    </section>
{/if}
<script lang="ts">
    import {TabAnchor, TabGroup} from "@skeletonlabs/skeleton";
    import {battleStorage} from "$lib/stores";
    import Statblock from "$lib/components/manager/Statblock.svelte";
    import HPManager from "$lib/components/manager/HPManager.svelte";
    import AddCombatantButton from "$lib/components/utils/AddCombatantButton.svelte";
    import AddCustomCombatantButton from "$lib/components/utils/AddCustomCombatantButton.svelte";
    import StatblockGrid from "$lib/components/manager/StatblockGrid.svelte";
    //export let data;

    const {
        data
    } = $props();

    const managedBattle = $derived($battleStorage.find(i => i.id === data.battleId))

</script>

{#if managedBattle}
    <section class="section">
        {#if $battleStorage.length > 0}
            <TabGroup justify="justify-center">
                {#each $battleStorage as battle}
                    <TabAnchor href="/manager/{battle.id}">
                        {battle.name}
                    </TabAnchor>
                {/each}
            </TabGroup>
        {:else}
            No Battles stored!
        {/if}
    </section>

    <StatblockGrid data={managedBattle.combatants} battleId={managedBattle.id}>
        <AddCombatantButton/>
        <AddCustomCombatantButton/>
    </StatblockGrid>
{/if}
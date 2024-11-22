<script lang="ts">
    import { TabAnchor, TabGroup } from "@skeletonlabs/skeleton";
    import { battleStorage } from "$lib/stores";
    import AddCombatantButton from "$lib/components/utils/buttons/AddCombatantButton.svelte";
    import AddCustomCombatantButton from "$lib/components/utils/buttons/AddCustomCombatantButton.svelte";
    import StatblockGrid from "$lib/components/manager/StatblockGrid.svelte";
    import Initiative from "$lib/components/manager/Initiative.svelte";

    const { data } = $props();

    const managedBattle = $derived(
        $battleStorage.find((i) => i.id === data.battleId),
    );
</script>

{#if managedBattle}
    <nav class="nav">
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
    </nav>

    <Initiative {managedBattle}/>

    <StatblockGrid data={managedBattle.combatants} battleId={managedBattle.id}>
        <!-- <AddCombatantButton /> -->
        <AddCustomCombatantButton />
    </StatblockGrid>
{/if}

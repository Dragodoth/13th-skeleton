<script lang="ts">
    import HPBlock from "$lib/components/manager/HPBlock.svelte";

    import type {Combatant} from "$lib/types";
    import {battles} from "$lib/stores";

    interface Props {
        battleId: string;
        combatantId: string;
    }

    const {
        battleId,
        combatantId,
    }: Props = $props();

    let combatant: Combatant | undefined = $state();
    $effect(() => {
        combatant = $battles.find(i => i.id === battleId)?.combatants.find(c => c.id === combatantId) ?? undefined;
    })

</script>

<div class="card flex flex-col items-center my-2 p-2 gap-2">
    <header class="card-header">HP Manager</header>
    {#if combatant}
        {#each {length: combatant.mook ? 1: combatant.count} as _, HPIndex}
            <HPBlock {battleId} {combatantId} {HPIndex}/>
        {/each}
        {#if !combatant.mook}
        <footer class="card-footer">
            <button aria-label="addRemoveButton" type="button" class="btn btn-sm variant-ghost"
                    onclick={() => battles.removeCombatant(battleId, combatant?.id)}><i class="fa-solid fa-minus"></i>
            </button>
            <button aria-label="addCombatantButton" type="button" class="btn btn-sm variant-ghost"
                    onclick={() => battles.addCombatant(battleId, combatant)}><i class="fa-solid fa-plus"></i>
            </button>
        </footer>
        {/if}
    {/if}
</div>
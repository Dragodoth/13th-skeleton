<script lang="ts">
    import HPBlock from "$lib/components/manager/HPBlock.svelte";

    import type {Combatant} from "$lib/types";
    import {battles} from "$lib/stores";

    export let  battleId: string, combatantIndex: number;

    let combatant: Combatant  | null ;
    $: combatant = $battles.find(i => i.id === battleId)?.combatants[combatantIndex] ?? null;
</script>

<div class="card flex flex-col items-center my-2 p-2 gap-2">
    <header class="card-header">HP Manager</header>
    {#if combatant}
        {#each {length: combatant.count} as _, HPIndex}
            <HPBlock {battleId} {combatantIndex} {HPIndex}/>
        {/each}
    <footer class="card-footer">
        <button type="button" class="btn btn-sm variant-ghost" on:click={() => battles.removeCombatant(battleId, combatantIndex)}><i class="fa-solid fa-minus"/></button>
        <button type="button" class="btn btn-sm variant-ghost" on:click={() => battles.addCombatant(battleId, combatant)}><i class="fa-solid fa-plus"/></button>
    </footer>
    {/if}
</div>
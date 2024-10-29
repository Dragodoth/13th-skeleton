<script>
import HPBlock from "$lib/components/HPBlock.svelte";
export let  battleId, combatant, combatantIndex;
</script>

<div class="card flex flex-col items-center my-2 p-2 gap-2">
    <header class="card-header">HP Manager</header>
    {#each {length: combatant.count} as _, HPIndex}
        <HPBlock {battleId} {combatant} {combatantIndex} {HPIndex} />
    {/each}
    <footer class="card-footer">
        <button type="button" class="btn btn-sm variant-ghost" ><i class="fa-solid fa-minus" /></button>
        <button type="button" class="btn btn-sm variant-ghost" ><i class="fa-solid fa-plus" /></button>
    </footer>
</div>
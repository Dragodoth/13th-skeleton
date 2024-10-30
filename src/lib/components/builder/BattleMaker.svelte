<script lang="ts">
    import {mEqBudget, playerNumber, battleLevel, battles, displayedBattleId} from "$lib/stores.ts";
    import {ProgressBar} from "@skeletonlabs/skeleton";
    import MonsterCard from "$lib/components/builder/MonsterCard.svelte";
    import SaveBattleButton from "$lib/components/builder/utils/SaveBattleButton.svelte";
    import type {Battle} from "$lib/types.ts";
    import RemoveCombatantsButton from "$lib/components/builder/utils/RemoveCombatantsButton.svelte";

    console.log($battles);

    $: console.log($displayedBattleId);
    let displayedBattle: Battle;

    let totalCost = 0;
    $: {
        displayedBattle = ($battles.find(b => b.id === $displayedBattleId) ?? $battles[0]);

        if ($battleLevel && displayedBattle) {
            const updatedCombatants = battles.updateCombatantsCost(displayedBattle.combatants);
            battles.updateCombatants($displayedBattleId, updatedCombatants)
            totalCost = battles.calculateTotalCost(displayedBattle.combatants);
        }
    }
</script>

<section class="card p-4 flex flex-col items-center gap-4 variant-soft">
    <div class="flex gap-2">
        <label class="label">
            <span>Select battle to display</span>
            <select class="select" bind:value={$displayedBattleId}>
                {#each $battles as battle}
                    <option value={battle.id}>{battle.name}</option>
                {/each}
            </select>
        </label>
    </div>

    <hr class="w-full !border-t-2"/>

    <header class="card-header h2">
        {displayedBattle?.name ?? 'Skeleton Battle'}
    </header>
    <p>{displayedBattle?.description ?? ''}</p>

    <section class="card p-4 flex flex-col items-center gap-4 w-full">
        <header class="card-header h3">
            Battle budget: {totalCost} / {$mEqBudget[$playerNumber]}
        </header>

        <ProgressBar meter="bg-primary-500" track="bg-primary-500/30" value={totalCost} max={$mEqBudget[$playerNumber]}/>

        {#if displayedBattle && displayedBattle.combatants.length > 0}
            <div class="p-4 flex flex-wrap gap-4">
                {#each displayedBattle.combatants as combatant, i (i)}
                    <MonsterCard battleId={displayedBattle.id} combatants={displayedBattle.combatants} {combatant} {i}/>
                {/each}
            </div>
        {:else}
            <span class="py-10">Click on the Monsters in the Table below to add them into the battle.</span>
        {/if}
    </section>
    {#if displayedBattle && displayedBattle.combatants.length > 0}
        <hr class="w-full !border-t-2"/>
        <footer class="card-footer flex gap-4 items-center">
                <SaveBattleButton battleToSave={displayedBattle} />
                <RemoveCombatantsButton battleId={displayedBattleId}/>
        </footer>
    {/if}
</section>

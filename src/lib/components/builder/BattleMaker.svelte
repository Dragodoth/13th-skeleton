<script lang="ts">
    import {mEqBudget, playerNumber, battleLevel, battles, displayedBattleId} from "$lib/stores.ts";
    import {ProgressBar} from "@skeletonlabs/skeleton";
    import CombatantCard from "$lib/components/builder/CombatantCard.svelte";
    import SaveBattleButton from "$lib/components/builder/utils/SaveBattleButton.svelte";
    import type {Battle} from "$lib/types.ts";
    import RemoveCombatantsButton from "$lib/components/builder/utils/RemoveCombatantsButton.svelte";

    if (!$battles.find(b => b.id === $displayedBattleId)) {
        $displayedBattleId = $battles[0].id;
    }

    const displayedBattle: Battle = $derived($battles.find(b => b.id === $displayedBattleId) ?? $battles[0]);
    let totalCost = $state(0);

    $effect(() => {
        if ($battleLevel) {
            const updatedCombatants = battles.updateCombatantsCost(displayedBattle.combatants);
            battles.updateCombatants($displayedBattleId, updatedCombatants)
            totalCost = battles.calculateTotalCost(displayedBattle.combatants);
        }
    })

    //$inspect(displayedBattle);
</script>

<section class="card p-4 flex flex-col items-center gap-4 variant-soft">
    {#if $battles.length > 1}
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
    {/if}

    <header class="card-header h2">
        {displayedBattle?.name ?? 'Skeleton Battle'}
    </header>
    <p>{displayedBattle?.description ?? ''}</p>

    <section class="card p-4 flex flex-col items-center gap-4 w-full">
        <header class="card-header h3">
            Battle budget: {totalCost} / {$mEqBudget[$playerNumber]}
        </header>

        <ProgressBar meter="bg-primary-500" track="bg-primary-500/30" value={totalCost}
                     max={$mEqBudget[$playerNumber]}/>

        {#if displayedBattle && displayedBattle.combatants.length > 0}
            <div class="p-4 flex flex-wrap gap-4">
                {#each displayedBattle.combatants as combatant}
                    {#if combatant.mook}
                        {#each combatant.combatantCount as mob}
                            <CombatantCard {displayedBattle} {combatant} mobId={mob.id}/>
                        {/each}
                        {:else}
                        <CombatantCard {displayedBattle} {combatant}/>
                    {/if}
                {/each}
            </div>
        {:else}
            <span class="py-10">Click on the Monsters in the Table below to add them into the battle.</span>
        {/if}
    </section>
    {#if displayedBattle && displayedBattle.combatants.length > 0}
        <hr class="w-full !border-t-2"/>
        <footer class="card-footer flex gap-4 items-center">
            <SaveBattleButton battleToSave={displayedBattle}/>
            <RemoveCombatantsButton battleId={$displayedBattleId}/>
        </footer>
    {/if}
</section>

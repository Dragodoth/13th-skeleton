<script lang="ts">
    import {
        mEqBudget,
        playerNumber,
        battleLevel,
        battle,
        battleStorage,
    } from "$lib/stores.ts";
    import { ProgressBar } from "@skeletonlabs/skeleton";
    import CombatantCard from "$lib/components/builder/CombatantCard.svelte";
    import SaveBattleButton from "$lib/components/utils/SaveBattleButton.svelte";
    import type { Battle } from "$lib/types.ts";
    import RemoveCombatantsButton from "$lib/components/utils/ResetBattle.svelte";
    import ImportBattleButton from "../utils/ImportBattleButton.svelte";

    const displayedBattle: Battle = $derived($battle);
    let totalCost = $state(0);

    $effect(() => {
        if ($battleLevel) {
            const updatedCombatants = battle.updateCombatantsCost(
                displayedBattle.combatants,
            );
            battle.updateCombatants(updatedCombatants);
            totalCost = battle.calculateTotalCost(displayedBattle.combatants);
        }
    });
    console.log(displayedBattle)
</script>

<section class="card p-4 flex flex-col items-center gap-4 variant-soft">
    {#if $battleStorage.length > 0}
        <ImportBattleButton />
        <hr class="w-full !border-t-2" />
    {/if}

    <label class="label">
        <span>Name</span>
        <input
            class="input h2"
            type="text"
            placeholder="Name"
            bind:value={displayedBattle.name} />
    </label>

    <label class="label">
        <span>Description</span>
        <input
            class="input"
            type="text"
            placeholder="Description"
            bind:value={displayedBattle.description} />
    </label>

    <section class="card p-4 flex flex-col items-center gap-4 w-full">
        <header class="card-header h3">
            Battle budget: {totalCost} / {$mEqBudget[$playerNumber]}
        </header>

        <ProgressBar
            meter="bg-primary-500"
            track="bg-primary-500/30"
            value={totalCost}
            max={$mEqBudget[$playerNumber]} />

        {#if displayedBattle && displayedBattle.combatants.length > 0}
            <div class="p-4 flex flex-wrap gap-4">
                {#each displayedBattle.combatants as combatant}
                    {#if combatant.mook}
                        {#each combatant.combatantCount as mob}
                            <CombatantCard
                                {displayedBattle}
                                {combatant}
                                mobId={mob.id} />
                        {/each}
                    {:else}
                        <CombatantCard {displayedBattle} {combatant} />
                    {/if}
                {/each}
            </div>
        {:else}
            <span class="py-10"
                >Click on the Monsters in the Table below to add them into the
                battle.</span>
        {/if}
    </section>
    {#if displayedBattle.combatants.length > 0}
        <hr class="w-full !border-t-2" />
        <footer class="card-footer flex gap-4 items-center">
            {#if $battleStorage.find((b) => b.id === displayedBattle.id)}
                <button
                    type="button"
                    class="btn btn-sm variant-filled-warning"
                    onclick={() => {
                        battleStorage.updateCombatants(
                            displayedBattle.id,
                            displayedBattle.combatants,
                        );
                        battleStorage.updateNameAndDescription(
                            displayedBattle.id,
                            displayedBattle.name,
                            displayedBattle.description,
                        );
                    }}>
                    <span><i class="fa-solid fa-pen"></i></span>
                    <span>Update Battle</span>
                </button>
            {/if}
            <SaveBattleButton battleToSave={displayedBattle} />
            <RemoveCombatantsButton />
        </footer>
    {/if}
</section>

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
    import SaveBattleButton from "$lib/components/utils/buttons/SaveBattleButton.svelte";
    import type { Battle } from "$lib/types.ts";
    import ImportBattleButton from "../utils/buttons/ImportBattleButton.svelte";
    import ConfirmButtonModal from "../utils/buttons/ConfirmButtonModal.svelte";

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
</script>

<section class="card p-4 flex flex-col items-center gap-4 variant-soft">
    {#if $battleStorage.length > 0}
        <ImportBattleButton />
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
                                combatantId={combatant.id}
                                mobId={mob.id} />
                        {/each}
                    {:else}
                        <CombatantCard combatantId={combatant.id} />
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
                <ConfirmButtonModal
                    title="Overwrite this battle in storage?"
                    handleConfirm={() => {
                        battleStorage.updateCombatants(
                            displayedBattle.id,
                            displayedBattle.combatants,
                        );
                        battleStorage.updateNameAndDescription(
                            displayedBattle.id,
                            displayedBattlmobIdname,
                            displayedBattle.description,
                        );
                    }}
                    buttonCSS="btn-sm variant-filled-warning"
                    buttonIconCSS="fa-solid fa-pen"
                    buttonText="Update Battle" />
            {/if}
            <SaveBattleButton />
            <ConfirmButtonModal
                title="Reset battle?"
                handleConfirm={() => battle.resetBattle()}
                buttonCSS="btn-sm variant-filled-error"
                buttonIconCSS="fa-solid fa-trash"
                buttonText="Reset Battle" />
        </footer>
    {/if}
</section>

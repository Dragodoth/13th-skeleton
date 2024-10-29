<script lang="ts">
    import {mEqBudget, battle, playerNumber, battleLevel, battleStorage} from "$lib/stores.ts";
    import {ProgressBar, getModalStore} from "@skeletonlabs/skeleton";
    import MonsterCard from "$lib/components/MonsterCard.svelte";
    import ImportButton from "$lib/components/ImportBattleButton.svelte";
    import StoreBattleButton from "$lib/components/StoreBattleButton.svelte";
    import type {ModalSettings} from "@skeletonlabs/skeleton";

    const modalStore = getModalStore();

    function handleEmptyBattleClick() {
        new Promise<boolean>((resolve) => {
            const modal: ModalSettings = {
                type: 'confirm',
                // Data
                title: 'Please Confirm',
                body: 'Are you sure you want to delete all combatants?',
                // TRUE if confirm pressed, FALSE if cancel pressed
                response: (r: boolean) => resolve(r),
            };
            modalStore.trigger(modal);
        }).then((r: boolean) => {
            if (r) {
                battle.removeAllCombatants();
            }
        })
    }

    function handleUpdateBattle() {
        new Promise<boolean>((resolve) => {
            const modal: ModalSettings = {
                type: 'confirm',
                // Data
                title: 'Please Confirm',
                body: 'Are you sure you want to update stored battle?',
                // TRUE if confirm pressed, FALSE if cancel pressed
                response: (r: boolean) => resolve(r),
            };
            modalStore.trigger(modal);
        }).then((r: boolean) => {
            if (r) {
                battleStorage.updateCombatantsStorage($battle.combatants, $battle.id)
            }
        })
    }

    let totalCost = 0;

    $: {
        if ($battleLevel) {
            const updatedCombatants = battle.updateCombatantsCost($battle.combatants); // Calculate updated costs
            battle.updateCombatants(updatedCombatants); // Update the combatants store with the new array
            totalCost = battle.calculateTotalCost($battle.combatants); // Calculate the total cost
        }
    }

    console.log($battleStorage);


</script>

<div class="card p-4 flex flex-col items-center gap-4 variant-soft">
    <div class="flex gap-2">
        {#if $battleStorage.length > 0}
            <ImportButton/>
        {/if}
        {#if $battle.combatants.length > 0}
            <StoreBattleButton/>
        {/if}

    </div>

    <hr class="w-full !border-t-2"/>

    <header class="card-header h3">
        {$battle.name}
    </header>

    <p>{$battle.description}</p>
    <div class="card p-4 flex flex-col items-center gap-4 w-full">
        <header class="card-header h4">
            Battle budget: {totalCost} / {$mEqBudget[$playerNumber]}
        </header>

        <ProgressBar track="bg-surface-200-700-token w-1/3" value={totalCost} max={$mEqBudget[$playerNumber]}/>
        {#if $battle.combatants.length > 0}
        <div class="p-4 flex flex-wrap gap-4">
            {#each $battle.combatants as item, i (i)}
                <MonsterCard items={$battle.combatants} {item} {i}/>
            {/each}
        </div>
            {:else}
            <span class="py-10">Click on the Monsters in the Table below to add them into the battle.</span>
        {/if}
    </div>
    {#if $battle.combatants.length > 0}
        <hr class="w-full !border-t-2"/>
        <footer class="card-footer flex gap-4 items-center">
            {#if $battleStorage.find(b => b.id === $battle.id)}
                <button type="button" class="btn btn-sm variant-filled-warning"
                        on:click={handleUpdateBattle}>
                    <span><i class="fa-solid fa-pen"/></span>
                    <span>Update Stored Battle</span>
                </button>
            {/if}

            <button type="button" class="btn btn-sm variant-filled-error" on:click={handleEmptyBattleClick}>
                <span><i class="fa-solid fa-trash"/></span>
                <span>Empty Battle</span>
            </button>
        </footer>
    {/if}
</div>

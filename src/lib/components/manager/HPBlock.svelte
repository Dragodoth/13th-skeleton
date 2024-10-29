<script lang="ts">
    import {ProgressBar} from "@skeletonlabs/skeleton";
    import type {Combatant} from "$lib/types";
    import {battles} from "$lib/stores";

    export let battleId: string;
    export let combatantIndex: number;
    export let HPIndex: number;

    let combatant: Combatant | null;
    $: combatant = $battles.find(i => i.id === battleId)?.combatants[combatantIndex] ?? null;

    let HPInput: string;

    function handleHPUpdate() {
        console.log(HPInput);
        if (HPInput && combatant && parseFloat(HPInput)) {
            if (HPInput.includes("-")){
                let newHP: number = combatant.currentHP[HPIndex] + parseFloat(HPInput);
                battles.updateHP(battleId, newHP, combatantIndex, HPIndex);
            } else if (HPInput.includes("+")){
                let newHP: number = combatant.currentHP[HPIndex] + parseFloat(HPInput);
                battles.updateHP(battleId, newHP, combatantIndex, HPIndex);
            } else {
                battles.updateHP(battleId, parseFloat(HPInput), combatantIndex, HPIndex);
            }
        }
    }

</script>
{#if combatant}
    <section class="card p-2 w-full">
        <div class="flex gap-2 items-end">
            <span>{combatant.currentHP[HPIndex]}</span>
            <div class="flex grow flex-col items-center gap-2">
                <span>{combatant.name} #{HPIndex + 1}</span>
                <ProgressBar
                        meter="bg-success-500"
                        track="bg-success-500/30"
                        bind:value={combatant.currentHP[HPIndex]}
                        max={combatant.hp}
                />
            </div>
            <span>{combatant.hp}</span>
        </div>
        <div class="p-2 flex gap-2">
            <input
                    class="input text-xs"
                    type="text"
                    placeholder="Enter damage (-), healing (+) or new HP"
                    bind:value={HPInput}
            />
            <button type="button" class="btn btn-sm variant-ghost" on:click={handleHPUpdate}>Update HP</button>
        </div>
    </section>
{/if}
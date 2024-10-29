<script lang="ts">
    import { ProgressBar } from "@skeletonlabs/skeleton";
    import type { Combatant } from "$lib/types";
    import { battleStorage } from "$lib/stores";

    export let battleId: string;
    export let combatant: Combatant;
    export let combatantIndex: number;
    export let HPIndex: number;

    let HPInput: number;

    function handleHPUpdate() {
        console.log(`Updating HP for ${combatant.name} at index ${HPIndex}:`, HPInput);

        battleStorage.updateHP(battleId, HPInput, combatantIndex, HPIndex);
    }

</script>
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
                type="number"
                placeholder="Enter damage (-), healing (+) or new HP"
                bind:value={HPInput}
        />
        <button type="button" class="btn btn-sm variant-ghost" on:click={handleHPUpdate}>Update HP</button>
    </div>
</section>

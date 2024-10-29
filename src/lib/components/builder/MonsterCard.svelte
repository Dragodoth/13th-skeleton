<script lang="ts">
    import type {Combatant} from "$lib/types";

    export let battleId: string, combatants: Combatant[], combatant: Combatant, i: number;
    import {battles} from "$lib/stores.ts";

    $: displayedCombatant = combatants.find(c => c.id === combatant.id) ?? null;

</script>

{#if displayedCombatant}
    <aside class="alert variant-ghost flex flex-row gap-2">
        <!-- Message -->
        <div class="alert-message">
            <h3 class="h3">{displayedCombatant.count}x {combatant.name}</h3>
            <p>Cost: {parseFloat(displayedCombatant.cost.toFixed(1))}</p>
        </div>
        <!-- Actions -->
        <div class="alert-actions">
            <button type="button" class="btn btn-sm variant-ghost"
                    on:click={() => battles.addCombatant(battleId, combatant)}><i class="fa-solid fa-plus"/>
            </button>
            <button type="button" class="btn btn-sm variant-ghost"
                    on:click={() => battles.removeCombatant(battleId, i)}><i class="fa-solid fa-minus"/>
            </button>
        </div>
    </aside>
{/if}
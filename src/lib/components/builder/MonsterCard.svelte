<script lang="ts">
    import type {Combatant} from "$lib/types";
    import {battles} from "$lib/stores.ts";

    interface Props {
        battleId: string;
        combatants: Combatant[];
        combatant: Combatant;
        index: number;
    }

    const {
        battleId,
        combatants,
        combatant,
        index
    }: Props = $props();

    const displayedCombatant = $derived(combatants.find(c => c.id === combatant.id) ?? null);

</script>

{#if displayedCombatant}
    <section class="alert variant-ghost flex flex-row gap-2">
        <!-- Message -->
        <div class="alert-message">
            <h3 class="h3">{combatant.mook ? "Mob of " : ""}{displayedCombatant.count}x {combatant.name}</h3>
            <p>Cost: {parseFloat(displayedCombatant.cost.toFixed(1))}</p>
        </div>
        <!-- Actions -->
        <div class="alert-actions">
            <button aria-label="addCombatantButton" type="button" class="btn btn-sm variant-ghost"
                    onclick={() => battles.addCombatant(battleId, combatant)}><i class="fa-solid fa-plus"></i>
            </button>
            <button aria-label="addRemoveButton" type="button" class="btn btn-sm variant-ghost"
                    onclick={() => battles.removeCombatant(battleId, combatant.id)}><i class="fa-solid fa-minus"></i>
            </button>
        </div>
    </section>
{/if}
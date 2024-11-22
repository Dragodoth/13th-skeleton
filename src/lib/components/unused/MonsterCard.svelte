<script lang="ts">
    import type {Enemy} from "$lib/types";
    import {battle, battleStorage} from "$lib/stores.ts";

    interface Props {
        combatants: Enemy[];
        combatant: Enemy;
        index: number;
    }

    const {
        combatants,
        combatant,
        index
    }: Props = $props();

    const displayedCombatant = $derived(
        (
            combatant.mook
                ? combatants.find(c => c.mobId === combatant.mobId)
                : combatants.find(c => c.id === combatant.id)
        ) ?? null);

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
            {#if combatant.mook}
                <button aria-label="addCombatantButton" type="button" class="btn btn-sm variant-ghost"
                        onclick={() => battle.addMook(combatant)}><i class="fa-solid fa-plus"></i>
                </button>
            {:else}
                <button aria-label="addCombatantButton" type="button" class="btn btn-sm variant-ghost"
                        onclick={() => battle.addCombatant(combatant)}><i class="fa-solid fa-plus"></i>
                </button>
            {/if}
            {#if combatant.mook && combatant.mobId}
                <button aria-label="addCombatantButton" type="button" class="btn btn-sm variant-ghost"
                        onclick={() => battle.removeMook(combatant.mobId)}><i class="fa-solid fa-minus"></i>
                </button>
            {:else}
                <button aria-label="addCombatantButton" type="button" class="btn btn-sm variant-ghost"
                        onclick={() => battle.removeCombatant(combatant.id)}><i class="fa-solid fa-minus"></i>
                </button>
            {/if}

        </div>
    </section>
{/if}
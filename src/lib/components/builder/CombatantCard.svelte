<script lang="ts">
    import type {Battle, Combatant} from "$lib/types";
    import {battles} from "$lib/stores.ts";

    interface Props {
        displayedBattle: Battle;
        combatants: Combatant[];
        combatant: Combatant;
        mobId?: string;
    }

    const {
        displayedBattle,
        combatants,
        combatant,
        mobId = ""
    }: Props = $props();


    let displayedCombatant = $derived(displayedBattle.combatants.find(c => c.id === combatant.id));
    $inspect(displayedCombatant);

</script>

{#if displayedCombatant}
    <section class="alert variant-ghost flex flex-row gap-2">
        <!-- Message -->
        {#if displayedCombatant.mook && mobId}
            <div class="alert-message">
                <h3 class="h3">Mob of {displayedCombatant.combatantCount.find(c => c.id === mobId)?.count}
                    x {displayedCombatant.name}</h3>
                <p>Cost: {parseFloat(displayedCombatant.combatantCount.find(c => c.id === mobId)?.mobCost?.toFixed(1) ?? "0")}</p>
            </div>
            <!-- Actions -->
            <div class="alert-actions">
                <button aria-label="addCombatantButton" type="button" class="btn btn-sm variant-ghost"
                        onclick={() => battles.addMook(displayedBattle.id, displayedCombatant, mobId)}><i class="fa-solid fa-plus"></i>
                </button>
                <button aria-label="addCombatantButton" type="button" class="btn btn-sm variant-ghost"
                        onclick={() => battles.removeMook(displayedBattle.id, displayedCombatant.id, mobId)}><i
                        class="fa-solid fa-minus"></i>
                </button>
            </div>
        {:else}
            <div class="alert-message">
                <h3 class="h3">{displayedCombatant.combatantCount.length}x {displayedCombatant.name}</h3>
                <p>Cost: {parseFloat(displayedCombatant.cost.toFixed(1))}</p>
            </div>
            <!-- Actions -->
            <div class="alert-actions">
                <button aria-label="addCombatantButton" type="button" class="btn btn-sm variant-ghost"
                        onclick={() => battles.addCombatant(displayedBattle.id, displayedCombatant)}><i class="fa-solid fa-plus"></i>
                </button>
                <button aria-label="addCombatantButton" type="button" class="btn btn-sm variant-ghost"
                        onclick={() => battles.removeCombatant(displayedBattle.id, displayedCombatant.id)}><i
                        class="fa-solid fa-minus"></i>
                </button>
            </div>
        {/if}
    </section>
{/if}
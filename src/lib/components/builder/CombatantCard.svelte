<script lang="ts">
    import type { Battle, Combatant } from "$lib/types";
    import { battle } from "$lib/stores.ts";

    interface Props {
        combatantId: string;
        mobId?: string;
    }

    const { combatantId, mobId = "" }: Props = $props();

    const displayedBattle: Battle = $derived($battle);
    let displayedCombatant: Combatant | undefined = $state();

    $effect(() => {
        displayedCombatant = displayedBattle.combatants.find(
            (c) => c.id === combatantId,
        );
    });
</script>

{#if displayedCombatant}
    <section class="alert variant-ghost flex flex-row gap-2">
        <!-- Message -->
        {#if displayedCombatant.mook && mobId}
            <div class="alert-message">
                <h3 class="h3">
                    Mob of {displayedCombatant.combatantCount.find(
                        (c) => c.id === mobId,
                    )?.mookCount}
                    x {displayedCombatant.name}
                </h3>
                <p>
                    Cost: {parseFloat(
                        displayedCombatant.combatantCount
                            .find((c) => c.id === mobId)
                            ?.mobCost?.toFixed(1) ?? "0",
                    )}
                </p>
            </div>
            <!-- Actions -->
            <div class="alert-actions">
                <button
                    aria-label="addCombatantButton"
                    type="button"
                    class="btn btn-sm variant-ghost"
                    onclick={() => battle.addMook(displayedCombatant, mobId)}
                    ><i class="fa-solid fa-plus"></i>
                </button>
                <button
                    aria-label="addCombatantButton"
                    type="button"
                    class="btn btn-sm variant-ghost"
                    onclick={() =>
                        battle.removeMook(displayedCombatant?.id, mobId)}
                    ><i class="fa-solid fa-minus"></i>
                </button>
            </div>
        {:else}
            <div class="alert-message">
                <h3 class="h3">
                    {displayedCombatant.combatantCount.length}x {displayedCombatant.name}
                </h3>
                <p>Cost: {parseFloat(displayedCombatant.cost.toFixed(1))}</p>
            </div>
            <!-- Actions -->
            <div class="alert-actions">
                <button
                    aria-label="addCombatantButton"
                    type="button"
                    class="btn btn-sm variant-ghost"
                    onclick={() => battle.addCombatant(displayedCombatant)}
                    ><i class="fa-solid fa-plus"></i>
                </button>
                <button
                    aria-label="addCombatantButton"
                    type="button"
                    class="btn btn-sm variant-ghost"
                    onclick={() =>
                        battle.removeCombatant(displayedCombatant?.id)}
                    ><i class="fa-solid fa-minus"></i>
                </button>
            </div>
        {/if}
    </section>
{/if}

<script lang="ts">
    import type { Battle, Enemy } from "$lib/types";
    import { battle } from "$lib/stores.ts";

    interface Props {
        enemyId: string;
        combatantId?: string;
    }

    const { enemyId, combatantId = "" }: Props = $props();

    const displayedBattle: Battle = $derived($battle);
    let displayedEnemy: Enemy | undefined = $state();

    $effect(() => {
        displayedEnemy = displayedBattle.enemies.find(
            (enemy) => enemy.id === enemyId,
        );
    });
</script>

{#if displayedEnemy}
    <section class="alert variant-ghost flex flex-row gap-2">
        {#if displayedEnemy.mook && combatantId}
            <div class="alert-message">
                <h3 class="h3">
                    Mob of {displayedEnemy.combatants.find(
                        (enemy) => enemy.combatantId === combatantId,
                    )?.mookCount}
                    x {displayedEnemy.name}
                </h3>
                <p>
                    Cost: {parseFloat(
                        displayedEnemy.combatants
                            .find((enemy) => enemy.combatantId === combatantId)
                            ?.mobCost?.toFixed(1) ?? "0",
                    )}
                </p>
            </div>
            <!-- Actions -->
            <div class="alert-actions">
                <button
                  aria-label="addEnemyButton"
                    type="button"
                    class="btn btn-sm variant-ghost"
                    onclick={() => battle.addMook(displayedEnemy, combatantId)}
                    ><i class="fa-solid fa-plus"></i>
                </button>
                <button
                    aria-label="addEnemyButton"
                    type="button"
                    class="btn btn-sm variant-ghost"
                    onclick={() =>
                        battle.removeMook(displayedEnemy?.id, combatantId)}
                    ><i class="fa-solid fa-minus"></i>
                </button>
            </div>
        {:else}
            <div class="alert-message">
                <h3 class="h3">
                    {displayedEnemy.combatants.length}x {displayedEnemy.name}
                </h3>
                <p>Cost: {parseFloat(displayedEnemy.cost.toFixed(1))}</p>
            </div>
            <!-- Actions -->
            <div class="alert-actions">
                <button
                    aria-label="addEnemyButton"
                    type="button"
                    class="btn btn-sm variant-ghost"
                    onclick={() => battle.addEnemy(displayedEnemy)}
                    ><i class="fa-solid fa-plus"></i>
                </button>
                <button
                    aria-label="addEnemyButton"
                    type="button"
                    class="btn btn-sm variant-ghost"
                    onclick={() =>
                        battle.removeEnemy(displayedEnemy?.id)}
                    ><i class="fa-solid fa-minus"></i>
                </button>
            </div>
        {/if}
    </section>
{/if}

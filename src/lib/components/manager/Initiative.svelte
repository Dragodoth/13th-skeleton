<script lang="ts">
    import type { Battle, Combatant, InitiativeCombatant } from "$lib/types";

    interface Props {
        managedBattle: Battle;
    }
    import { battleStorage, heroCombatants } from "$lib/stores";

    const { managedBattle }: Props = $props();

    let initiativeCombatants: InitiativeCombatant[] | undefined = $state();

    $effect(() => {
        const enemyCombatants: InitiativeCombatant[] =
            managedBattle.enemies.flatMap((enemy) => {
                return enemy.combatants.map((combatant) => {
                    return {
                        id: enemy.id,
                        ...(enemy.mook && { mook: enemy.mook }),
                        combatantId: combatant.combatantId,
                        name: `${enemy.name} ${enemy.combatants.indexOf(combatant) + 1}`,
                        initiative: combatant.initiativeTotal,
                    };
                });
            });
        initiativeCombatants = [...enemyCombatants, ...$heroCombatants].sort(
            (a, b) => b.initiative - a.initiative,
        );
    });

    function handleInitiativeClick(
        enemyId: string,
        newInitiative: number,
        combatantId: string,
    ): void {
        console.log(enemyId);
        if (enemyId === "hero") {
            heroCombatants.updateInitiative(newInitiative, combatantId);
        } else {
            battleStorage.updateInitiative(
                managedBattle.id,
                enemyId,
                newInitiative,
                combatantId,
            );
        }
    }

    let turn = $state(0);

    const handleTurnIncreaseClick = (): void => {
        if (initiativeCombatants) {
            turn = (turn + 1) % initiativeCombatants.length;
        }
    };

    const handleTurnDecreaseClick = (): void => {
        if (initiativeCombatants) {
            turn =
                (turn - 1 + initiativeCombatants.length) %
                initiativeCombatants.length;
        }
    };

    const handleAddHeroCombatantClick = (): void => {
        heroCombatants.addCombatant({
            id: "hero",
            combatantId: Date.now().toString(),
            name: "Hero",
            initiative: 10,
        });
    };
</script>

{#if initiativeCombatants}
    <section class="flex gap-2 card py-2">
        <button
            aria-label="turnDecreaseButton"
            class="btn"
            onclick={handleTurnDecreaseClick}>
            <i class="fa-solid fa-arrow-left"></i>
        </button>
        <div class="flex gap-2 flex-wrap">
            {#each initiativeCombatants as combatant, i (i)}
                <div
                    class="card p-2 flex gap-2 items-center {i < turn
                        ? 'variant-soft-warning'
                        : i === turn
                          ? 'variant-ghost-primary'
                          : 'variant-ghost'}">
                    <div class="flex flex-col items-center">
                        <div class="flex justify-between">
                            
                            {#if combatant.id === "hero"}
                            <span class="h5 text-warning-500 font-bold">{combatant.name}</span>
                            <button
                                aria-label="removeHeroCombatantButton"
                                class="btn btn-sm"
                                onclick={() =>
                                    heroCombatants.removeCombatant(
                                        combatant.combatantId,
                                    )}>
                                <i class="fa-solid fa-trash"></i>
                            </button>
                            {:else}
                            <span>{combatant.name}</span>
                            {/if}
                        </div>
                        
                        <div class="flex gap-2">
                            <input
                                class="input w-20 h-10"
                                type="number"
                                bind:value={combatant.initiative}
                                onkeydown={(e) => {
                                    if (e.key === "Enter") {
                                        handleInitiativeClick(
                                            combatant.id,
                                            combatant.initiative,
                                            combatant.combatantId,
                                        );
                                        e.preventDefault();
                                    }
                                }} />
                            <button
                                aria-label="updateInitiativeButton"
                                class="btn btn-sm"
                                onclick={() =>
                                    handleInitiativeClick(
                                        combatant.id,
                                        combatant.initiative,
                                        combatant.combatantId,
                                    )}>
                                <i class="fa-solid fa-pen"></i>
                            </button>
                        </div>
                    </div>
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
            {/each}
            <button
                aria-label="addHeroCombatantButton"
                class="card p-4 flex items-center variant-ghost"
                onclick={handleAddHeroCombatantClick}>
                <i
                    class="fa-solid fa-plus fa-3x"
                    style="color: rgba(var(--color-surface-500));"></i>
            </button>
        </div>
        <button
            aria-label="turnDecreaseButton"
            class="btn"
            onclick={handleTurnIncreaseClick}>
            <i class="fa-solid fa-arrow-right"></i>
        </button>
    </section>
{/if}

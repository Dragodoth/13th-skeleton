<script lang="ts">
    import { ProgressBar, Ratings } from "@skeletonlabs/skeleton";
    import type { Combatant, Enemy } from "$lib/types";
    import { battleStorage } from "$lib/stores";

    interface Props {
        battleId: string;
        enemy: Enemy;
        combatant: Combatant;
    }

    const { battleId, enemy, combatant }: Props = $props();

    let HPInput: string | undefined = $state();
    let currentHP = $derived(combatant.currentHP);
    const maxHp = $derived(
        enemy?.mook ? enemy.hp * (combatant.mookCount ?? 1) : enemy?.hp,
    );

    function handleHPUpdate() {
        if (HPInput && enemy && parseFloat(HPInput) && currentHP) {
            if (HPInput.includes("-")) {
                let newHP: number = currentHP + parseFloat(HPInput);
                battleStorage.updateHP(
                    battleId,
                    enemy.id,
                    newHP,
                    combatant.combatantId,
                );
            } else if (HPInput.includes("+")) {
                let newHP: number = currentHP + parseFloat(HPInput);
                battleStorage.updateHP(
                    battleId,
                    enemy.id,
                    newHP,
                    combatant.combatantId,
                );
            } else {
                battleStorage.updateHP(
                    battleId,
                    enemy.id,
                    parseFloat(HPInput),
                    combatant.combatantId,
                );
            }
        }
    }
</script>

{#if enemy && currentHP}
    <section class="card p-2 w-full variant-ghost">
        <div class="flex gap-2 items-end">
            <span>{currentHP}</span>
            <div class="flex grow flex-col flex-wrap items-center gap-2">
                <p>
                    {enemy.name}
                    {enemy.mook ? "Mob " : ""}{enemy.combatants.indexOf(
                        combatant,
                    ) + 1}
                </p>
                {#if enemy.mook}
                    <p>
                        {Math.ceil(currentHP / enemy.hp)} / {combatant.mookCount}
                        mooks
                    </p>
                    <!--                    <Ratings value={Math.ceil(currentHP / enemy.hp)} max={enemy.combatantCount[HPIndex].mookCount}>-->
                    <!--                        <svelte:fragment slot="empty">-->
                    <!--                            <i class="fa-solid fa-skull-crossbones"></i>-->
                    <!--                        </svelte:fragment>-->
                    <!--                        <svelte:fragment slot="full">-->
                    <!--                            <i class="fa-solid fa-skull"></i>-->
                    <!--                        </svelte:fragment>-->
                    <!--                    </Ratings>-->
                    <div class="flex gap-2">
                        <button
                            aria-label="removeMookButton"
                            type="button"
                            class="btn btn-sm variant-ghost"
                            onclick={() =>
                                battleStorage.removeMook(
                                    battleId,
                                    enemy.id,
                                    combatant.combatantId,
                                )}
                            ><i class="fa-solid fa-minus"></i>
                        </button>
                        <button
                            aria-label="addMookButton"
                            type="button"
                            class="btn btn-sm variant-ghost"
                            onclick={() =>
                                battleStorage.addMook(
                                    battleId,
                                    enemy,
                                    combatant.combatantId,
                                )}
                            ><i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                {/if}
                <ProgressBar
                    meter="bg-success-500"
                    track="bg-success-500/30"
                    value={currentHP}
                    max={maxHp} />
            </div>
            <span>{maxHp}</span>
        </div>
        <div class="p-2 flex gap-2">
            <input
                class="input text-xs"
                type="text"
                placeholder="Enter damage (-), healing (+) or new HP"
                bind:value={HPInput}
                onkeydown={(e) => {
                    if (e.key === "Enter") {
                        handleHPUpdate();
                        e.preventDefault();
                    }
                }} />
            <button
                aria-label="updateHPButton"
                type="button"
                class="btn btn-sm variant-ghost"
                onclick={handleHPUpdate}
                ><i class="fa-solid fa-pen"></i></button>
        </div>
    </section>
{/if}

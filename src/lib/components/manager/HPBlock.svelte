<script lang="ts">
    import { ProgressBar, Ratings } from "@skeletonlabs/skeleton";
    import type { Combatant } from "$lib/types";
    import { battleStorage } from "$lib/stores";

    interface Props {
        battleId: string;
        combatant: Combatant;
        HPIndex: number;
        mobId?: string;
    }

    const { battleId, combatant, HPIndex, mobId = "" }: Props = $props();

    let HPInput: string | undefined = $state();
    let currentHP = $derived(combatant.combatantCount[HPIndex].currentHP);
    const maxHp = $derived(
        combatant?.mook
            ? combatant.hp * (combatant.combatantCount[HPIndex].mookCount ?? 1)
            : combatant?.hp,
    );

    function handleHPUpdate() {
        if (HPInput && combatant && parseFloat(HPInput) && currentHP) {
            if (HPInput.includes("-")) {
                let newHP: number = currentHP + parseFloat(HPInput);
                battleStorage.updateHP(
                    battleId,
                    combatant.id,
                    HPIndex,
                    newHP,
                    mobId,
                );
            } else if (HPInput.includes("+")) {
                let newHP: number = currentHP + parseFloat(HPInput);
                battleStorage.updateHP(
                    battleId,
                    combatant.id,
                    HPIndex,
                    newHP,
                    mobId,
                );
            } else {
                battleStorage.updateHP(
                    battleId,
                    combatant.id,
                    HPIndex,
                    parseFloat(HPInput),
                    mobId,
                );
            }
        }
    }
</script>

{#if combatant && currentHP}
    <section class="card p-2 w-full variant-ghost">
        <div class="flex gap-2 items-end">
            <span>{currentHP}</span>
            <div class="flex grow flex-col flex-wrap items-center gap-2">
                <p>
                    {combatant.name}
                    {combatant.mook ? "Mob " : ""}{HPIndex + 1}
                </p>
                {#if combatant.mook}
                    <p>
                        {Math.ceil(currentHP / combatant.hp)} / {combatant
                            .combatantCount[HPIndex].mookCount} mooks
                    </p>
                    <!--                    <Ratings value={Math.ceil(currentHP / combatant.hp)} max={combatant.combatantCount[HPIndex].mookCount}>-->
                    <!--                        <svelte:fragment slot="empty">-->
                    <!--                            <i class="fa-solid fa-skull-crossbones"></i>-->
                    <!--                        </svelte:fragment>-->
                    <!--                        <svelte:fragment slot="full">-->
                    <!--                            <i class="fa-solid fa-skull"></i>-->
                    <!--                        </svelte:fragment>-->
                    <!--                    </Ratings>-->
                    <div class="flex gap-2">
                        <button
                            aria-label="addCombatantButton"
                            type="button"
                            class="btn btn-sm variant-ghost"
                            onclick={() =>
                                battleStorage.removeMook(
                                    battleId,
                                    combatant.id,
                                    mobId,
                                )}
                            ><i class="fa-solid fa-minus"></i>
                        </button>
                        <button
                            aria-label="addCombatantButton"
                            type="button"
                            class="btn btn-sm variant-ghost"
                            onclick={() =>
                                battleStorage.addMook(
                                    battleId,
                                    combatant,
                                    mobId,
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
                type="button"
                class="btn btn-sm variant-ghost"
                onclick={handleHPUpdate}>Update HP</button>
        </div>
    </section>
{/if}

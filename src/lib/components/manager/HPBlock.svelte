<script lang="ts">
    import {ProgressBar} from "@skeletonlabs/skeleton";
    import type {Combatant} from "$lib/types";
    import {battles} from "$lib/stores";

    interface Props {
        battleId: string;
        combatantId: string;
        HPIndex: number;
        mobId?: string;
    }

    const {
        battleId,
        combatantId,
        HPIndex,
        mobId = ""
    }: Props = $props();

    const combatant: Combatant | undefined = $derived($battles.find(i => i.id === battleId)?.combatants.find(c => c.id === combatantId) ?? undefined);

    let currentHP = $state(0)
    $effect(() => {
            if (combatant) {
                currentHP = (combatant.combatantCount[HPIndex].currentHP) ?? 0;
            }
        }
    )
    let HPInput: string | undefined = $state();

    function handleHPUpdate() {
        if (HPInput && combatant && parseFloat(HPInput) && currentHP) {
            if (HPInput.includes("-")) {
                let newHP: number = currentHP + parseFloat(HPInput);
                battles.updateHP(battleId, combatantId, HPIndex, newHP, mobId);
            } else if (HPInput.includes("+")) {
                let newHP: number = currentHP + parseFloat(HPInput);
                battles.updateHP(battleId, combatantId, HPIndex, newHP, mobId);
            } else {
                battles.updateHP(battleId, combatantId, HPIndex, parseFloat(HPInput), mobId);
            }
        }
    }

    const maxHp = $derived(combatant?.mook ? combatant.hp * (combatant.combatantCount[HPIndex]?.mookCount ?? 1) : combatant?.hp)

</script>
{#if combatant && currentHP}
    <section class="card p-2 w-full variant-ghost">
        <div class="flex gap-2 items-end">
            <span>{currentHP}</span>
            <div class="flex grow flex-col items-center gap-2">
                    <p>{combatant.name} {combatant.mook ? "Mob " : ""}{HPIndex + 1}</p>
                {#if combatant.mook}
                    <p>{Math.ceil(currentHP / combatant.hp)} / {combatant.combatantCount[HPIndex].mookCount} mooks</p>
                    <div class="flex gap-2">
                        <button aria-label="addCombatantButton" type="button" class="btn btn-sm variant-ghost"
                                onclick={() => battles.removeMook(battleId, combatant.id, mobId)}><i class="fa-solid fa-minus"></i>
                        </button>
                        <button aria-label="addCombatantButton" type="button" class="btn btn-sm variant-ghost"
                                onclick={() => battles.addMook(battleId, combatant, mobId)}><i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                {/if}
                <ProgressBar
                        meter="bg-success-500"
                        track="bg-success-500/30"
                        bind:value={currentHP}
                        max={maxHp}
                />
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
                    }}
            />
            <button type="button" class="btn btn-sm variant-ghost" onclick={handleHPUpdate}>Update HP</button>
        </div>

    </section>
{/if}
<script lang="ts">
    import {ProgressBar} from "@skeletonlabs/skeleton";
    import type {Combatant} from "$lib/types";
    import {battles} from "$lib/stores";

    interface Props {
        battleId: string;
        combatantId: string;
        HPIndex: number;
    }

    const {
        battleId,
        combatantId,
        HPIndex
    }: Props = $props();

    const combatant: Combatant | null = $derived($battles.find(i => i.id === battleId)?.combatants.find(c => c.id === combatantId) ?? null);

    let currentHP = $state(0)
    $effect(() => {
            if (combatant) {
                currentHP = (combatant.mook ? combatant.currentHP[0] : combatant.currentHP[HPIndex]) ?? 0;
            }
        }
    )
    let HPInput: string | undefined = $state();

    function handleHPUpdate() {
        if (HPInput && combatant && parseFloat(HPInput) && currentHP) {
            if (HPInput.includes("-")) {
                let newHP: number = currentHP + parseFloat(HPInput);
                battles.updateHP(battleId, combatantId, HPIndex, newHP);
            } else if (HPInput.includes("+")) {
                let newHP: number = currentHP + parseFloat(HPInput);
                battles.updateHP(battleId, combatantId, HPIndex, newHP);
            } else {
                battles.updateHP(battleId, combatantId, HPIndex, parseFloat(HPInput));
            }
        }
    }

    const maxHp = $derived(combatant?.mook ? combatant?.hp * combatant?.count : combatant?.hp)

</script>
{#if combatant && currentHP}
    <section class="card p-2 w-full">
        <div class="flex gap-2 items-end">
            <span>{currentHP}</span>
            <div class="flex grow flex-col items-center gap-2">
                {#if combatant.mook}
                    <p>{combatant.name} Mob {HPIndex + 1}</p>
                    <p>{Math.ceil(currentHP / combatant.hp)} / {combatant.count} mooks</p>
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
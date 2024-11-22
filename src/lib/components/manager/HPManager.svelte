<script lang="ts">
    import HPBlock from "$lib/components/manager/HPBlock.svelte";

    import type { Enemy } from "$lib/types";
    import { battleStorage } from "$lib/stores";
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";

    interface Props {
        battleId: string;
        enemy: Enemy;
    }

    const { battleId, enemy }: Props = $props();
</script>

<Accordion padding="p-2" regionControl="h3">
    <span class="h2">{enemy.name}</span>
    <div class="card">
        <AccordionItem open>
            <svelte:fragment slot="summary">HP Manager</svelte:fragment>
            <svelte:fragment slot="content">
                <div
                    class="flex flex-col p-2 items-center gap-2 max-h-screen overflow-auto">
                    {#if enemy}
                        {#each enemy.combatants as combatant}
                            <HPBlock {battleId} {enemy} {combatant} />
                        {/each}
                    {/if}
                    <div>
                        {#if !enemy.mook}
                            <button
                                aria-label="addEnemyButton"
                                type="button"
                                class="btn btn-sm variant-ghost"
                                onclick={() =>
                                    battleStorage.removeEnemy(
                                        battleId,
                                        enemy.id,
                                    )}
                                ><i class="fa-solid fa-minus"></i>
                            </button>
                        {/if}
                        <button
                            aria-label="addEnemyButton"
                            type="button"
                            class="btn btn-sm variant-ghost"
                            onclick={() =>
                                battleStorage.addEnemy(battleId, enemy)}
                            ><i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </svelte:fragment>
        </AccordionItem>
    </div>
</Accordion>

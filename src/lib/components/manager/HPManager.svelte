<script lang="ts">
    import HPBlock from "$lib/components/manager/HPBlock.svelte";

    import type {Combatant} from "$lib/types";
    import {battles} from "$lib/stores";
    import {Accordion, AccordionItem} from "@skeletonlabs/skeleton";
    import BattleSliders from "$lib/components/builder/BattleSliders.svelte";

    interface Props {
        battleId: string;
        combatantId: string;
        combatant: Combatant;
    }

    const {
        battleId,
        combatantId,
        combatant
    }: Props = $props();

</script>

<Accordion >
    <AccordionItem open>
        <svelte:fragment slot="summary">
            <h2>HP Manager</h2>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <div class="card flex flex-col p-2 items-center gap-2">
                {#if combatant}
                    {#each combatant.combatantCount as _, HPIndex}
                        <HPBlock {battleId} {combatantId} {HPIndex} mobId={combatant.combatantCount[HPIndex].id}/>
                    {/each}
                    <footer class="card-footer">
                        {#if !combatant.mook}
                            <button aria-label="addRemoveButton" type="button" class="btn btn-sm variant-ghost"
                                    onclick={() => battles.removeCombatant(battleId, combatant.id)}><i
                                    class="fa-solid fa-minus"></i>
                            </button>
                        {/if}
                        <button aria-label="addCombatantButton" type="button" class="btn btn-sm variant-ghost"
                                onclick={() => battles.addCombatant(battleId, combatant)}><i
                                class="fa-solid fa-plus"></i>
                        </button>
                    </footer>
                {/if}
            </div>
        </svelte:fragment>
    </AccordionItem>
</Accordion>



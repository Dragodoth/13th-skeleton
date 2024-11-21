<script lang="ts">
    import type { Battle, InitiativeCombatant } from "$lib/types";

    interface Props {
        managedBattle: Battle;
    }
    import { battleStorage } from "$lib/stores";

    const { managedBattle }: Props = $props();

    let initiativeCombatants: InitiativeCombatant[] | undefined = $state();

    $effect(() => {
        initiativeCombatants = managedBattle.combatants
            .flatMap((combatant) => {
                let index = 0;
                return combatant.combatantCount.map((count) => {
                    index += 1;
                    return {
                        id: combatant.id,
                        index: index,
                        mobId: count?.mobId,
                        name: `${combatant.name} ${index}`,
                        initiative: count.initiativeTotal,
                    };
                });
            })
            .sort((a, b) => b.initiative - a.initiative);
    });

    function handleInitiativeClick(combatantId: string, index: number, newInitiative: number, mobId?: string): void {
        if (mobId){
            battleStorage.updateInitiative(managedBattle.id, combatantId, index, newInitiative, mobId);
        } else {
            battleStorage.updateInitiative(managedBattle.id, combatantId, index, newInitiative);
        }
        
    }
</script>

{#if initiativeCombatants}
    <section>
        <div class="flex gap-2 flex-wrap">
            {#each initiativeCombatants as combatant}
                <div class="card p-2 flex gap-2 items-center">
                    <div class="flex flex-col items-center">
                        <span class="">{combatant.name}</span>
                        <div class="flex gap-2">
                            <input
                                class="input w-20 h-10"
                                type="number"
                                bind:value={combatant.initiative} />
                            <button
                                class="btn variant-ghost text-xs"
                                onclick={() => handleInitiativeClick(combatant.id, combatant.index, combatant.initiative, combatant.mobId)}>
                                Update
                            </button>
                        </div>
                    </div>
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
            {/each}
        </div>
        <div></div>
    </section>
{/if}

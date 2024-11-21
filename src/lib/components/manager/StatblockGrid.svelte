<script lang="ts">
    import HPManager from "$lib/components/manager/HPManager.svelte";
    import Statblock from "$lib/components/manager/Statblock.svelte";
    import { type Combatant, isCombatant, type Monster } from "$lib/types.ts";
    import type { Snippet } from "svelte";
    import { customMonsterStorage } from "$lib/stores.ts";
    import ConfirmButtonModal from "../utils/buttons/ConfirmButtonModal.svelte";

    interface Props {
        data: Combatant[] | Monster[];
        battleId?: string;
        children?: Snippet;
    }

    const { data, battleId, children }: Props = $props();
</script>

<section class="section grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {#each data as combatant (combatant.id)}
        <div class="card flex flex-col gap-2 items-end">
            <div class="flex justify-between items-baseline px-2 gap-2 w-full">
                <header class="card-header h2">{combatant.name}</header>
                <span
                    >{combatant.source}
                    {combatant.source === "Custom" || !combatant.page
                        ? ""
                        : "p." + combatant.page}</span>
            </div>
            {#if combatant.source === "Custom"}
                <div>
                    <ConfirmButtonModal
                        title="Delete custom monster?"
                        handleConfirm={() =>
                            customMonsterStorage.removeMonster(combatant.id)}
                        buttonCSS="btn-sm variant-ghost"
                        buttonIconCSS="fa-solid fa-trash"
                        buttonText="Delete monster" />
                </div>
            {/if}
            <div class="card p-2 my-2 variant-ghost">
                {#if battleId && isCombatant(combatant)}
                    <HPManager {battleId} {combatant} />
                {/if}
                <section class=" card p-4 w-full">
                    <Statblock data={combatant} />
                </section>
            </div>
        </div>
    {/each}
    {#if children}
        {@render children()}
    {/if}
</section>

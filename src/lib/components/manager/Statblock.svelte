<script lang="ts">
    import type { Combatant } from "$lib/types";
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
    import ActionCards from "$lib/components/manager/ActionCards.svelte";
    import TraitCards from "$lib/components/manager/TraitCards.svelte";

    export let combatant: Combatant;

    const blockCSS = "-indent-5 ml-5";
    const divCSS = "flex flex-wrap variant-ghost-surface p-2 my-1 gap-1 rounded-xl w-full";
    const textCSS = "text-xl";
</script>

<section class="flex flex-col w-full gap-2">
    <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col gap-1">
            <span class="h1">{combatant.name}</span>
            <span class="p italic">
                {combatant.size} {combatant.levelOrdinal ?? combatant.level} level {combatant.role}
                [{combatant.type.toUpperCase()}]
            </span>
            <span class="p">Initiative: {combatant.initiative}</span>
        </div>
        <div class="flex justify-around items-center text-xl variant-ghost-surface rounded-3xl grow">
            <div class="flex flex-col">
                <span>AC {combatant.ac}</span>
                <span>PD {combatant.pd}</span>
                <span>MD {combatant.md}</span>
            </div>
            <span>HP {combatant.hp}</span>
        </div>
    </div>

    <Accordion>
        {#if combatant.actions || combatant.triggered_actions}
            <AccordionItem open>
                <svelte:fragment slot="summary">
                    <span class={textCSS}>Actions</span>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    {#if combatant.actions}
                        <ActionCards actions={combatant.actions} {divCSS} {blockCSS}/>
                    {/if}

                    {#if combatant.triggered_actions}
                        <span class="{textCSS}">Special triggers</span>
                        <ActionCards actions={combatant.triggered_actions} {divCSS} {blockCSS}/>
                    {/if}
                </svelte:fragment>
            </AccordionItem>
        {/if}

        {#if combatant.traits}
            <AccordionItem open>
                <svelte:fragment slot="summary">
                    <span class={textCSS}>Traits</span>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <TraitCards traits={combatant.traits} {divCSS} {blockCSS}/>
                </svelte:fragment>
            </AccordionItem>
        {/if}

        {#if combatant.nastier_traits}
            <AccordionItem>
                <svelte:fragment slot="summary">
                    <span class={textCSS}>Nastier Specials</span>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <TraitCards traits={combatant.nastier_traits} {divCSS} {blockCSS}/>
                </svelte:fragment>
            </AccordionItem>
        {/if}
    </Accordion>
</section>
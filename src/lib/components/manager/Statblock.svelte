<script lang="ts">
    import type {Combatant, Monster} from "$lib/types";
    import {Accordion, AccordionItem} from "@skeletonlabs/skeleton";
    import ActionCards from "$lib/components/manager/ActionCards.svelte";
    import TraitCards from "$lib/components/manager/TraitCards.svelte";

    interface Props {
        data: Combatant | Monster
    }

    const {
        data
    }: Props = $props();

    const blockCSS = "-indent-5 ml-5";
    const divCSS = "flex flex-wrap variant-ghost-surface p-2 my-1 gap-1 rounded-xl w-full";
    const textCSS = "text-xl";
</script>

<section class="flex flex-col w-full gap-2">
    <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col gap-1">
            <span class="h1">{data.name}</span>
            <span class="p italic">
                {data.size} {data.levelOrdinal ?? data.level} level {data.role}
                [{data.type.toUpperCase()}]
            </span>
            <span class="p">Initiative: {data.initiative}</span>
        </div>
        <div class="flex justify-around items-center text-xl variant-ghost-surface rounded-3xl grow">
            <div class="flex flex-col">
                <span>AC {data.ac}</span>
                <span>PD {data.pd}</span>
                <span>MD {data.md}</span>
            </div>
            <span>HP {data.hp}</span>
        </div>
    </div>

    <Accordion>
        {#if data.actions || data.triggered_actions}
            <AccordionItem open>
                <svelte:fragment slot="summary">
                    <span class={textCSS}>Actions</span>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    {#if data.actions}
                        <ActionCards actions={data.actions} {divCSS} {blockCSS}/>
                    {/if}

                    {#if data.triggered_actions}
                        <span class="{textCSS}">Special triggers</span>
                        <ActionCards actions={data.triggered_actions} {divCSS} {blockCSS}/>
                    {/if}
                </svelte:fragment>
            </AccordionItem>
        {/if}

        {#if data.traits}
            <AccordionItem open>
                <svelte:fragment slot="summary">
                    <span class={textCSS}>Traits</span>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <TraitCards traits={data.traits} {divCSS} {blockCSS}/>
                </svelte:fragment>
            </AccordionItem>
        {/if}

        {#if data.nastier_traits}
            <AccordionItem>
                <svelte:fragment slot="summary">
                    <span class={textCSS}>Nastier Specials</span>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <TraitCards traits={data.nastier_traits} {divCSS} {blockCSS}/>
                </svelte:fragment>
            </AccordionItem>
        {/if}
    </Accordion>
</section>
<script lang="ts">
    import type {Combatant, Monster} from "$lib/types";
    import {Accordion, AccordionItem} from "@skeletonlabs/skeleton";
    import type {Snippet} from "svelte";
    import type {Action, Trait} from "$lib/types";

    interface Props {
        data: Combatant | Monster;
    }

    const {
        data,
    }: Props = $props();

    const blockCSS = "-indent-5 ml-5";
    const divCSS = "flex flex-wrap variant-ghost-surface p-2 my-1 gap-1 rounded-xl w-full";
    const textCSS = "text-xl";
</script>

{#snippet actionCard(actions: Action[])}
    <ul class="list">
        {#each actions as action}
            <li>
                <div class={divCSS}>
                    <p class={blockCSS}>
                        <span class="font-bold">{action.name}</span> - <span>{action.desc}</span>
                    </p>
                    {#if action.traits}
                        <ul class="list">
                            {#each action.traits as trait}
                                <li>
                                    <p class={blockCSS}>
                                        <span class="italic">{trait.name}:</span>
                                        <span>{trait.desc}</span>
                                    </p>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            </li>
        {/each}
    </ul>
{/snippet}

{#snippet traitCard(traits: Trait[])}
    <ul class="list">
        {#each traits as trait}
            <li>
                <div class={divCSS}>
                    <p class={blockCSS}>
                        <span class="italic">{trait.name}:</span>
                        <span>{trait.desc}</span>
                    </p>
                </div>
            </li>
        {/each}
    </ul>
{/snippet}

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
                        {@render actionCard(data.actions)}
                    {/if}

                    {#if data.triggered_actions}
                        <span class="{textCSS}">Special triggers</span>
                        {@render actionCard(data.triggered_actions)}
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
                    {@render traitCard(data.traits)}
                </svelte:fragment>
            </AccordionItem>
        {/if}

        {#if data.nastier_traits}
            <AccordionItem>
                <svelte:fragment slot="summary">
                    <span class={textCSS}>Nastier Specials</span>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    {@render traitCard(data.nastier_traits)}
                </svelte:fragment>
            </AccordionItem>
        {/if}
    </Accordion>
</section>
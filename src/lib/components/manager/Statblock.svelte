<script lang="ts">
    import type { Combatant } from "$lib/types";
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";

    export let combatant: Combatant;

    console.log(combatant.actions[0].name);

    const blockCSS = "-indent-5 ml-5";
    const divCSS = "flex flex-wrap variant-ghost-surface p-2 rounded-xl w-full";
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
        <div class="flex justify-around items-center text-xl variant-ghost-surface rounded-xl grow">
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
                        <ul class="list">
                            {#each combatant.actions as action}
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
                    {/if}
                    {#if combatant.triggered_actions}
                        <ul class="list">
                            {#each combatant.triggered_actions as action}
                                <li>
                                    <div class={divCSS}>
                                        <p class={blockCSS}>
                                            <span class="italic">[Special trigger]</span>
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
                    <ul class="list">
                        {#each combatant.traits as trait}
                            <div class={divCSS}>
                                <li>
                                    <p class={blockCSS}>
                                        <span class="italic">{trait.name}:</span>
                                        <span>{trait.desc}</span>
                                    </p>
                                </li>
                            </div>
                        {/each}
                    </ul>
                </svelte:fragment>
            </AccordionItem>
        {/if}

        {#if combatant.nastier_traits}
            <AccordionItem>
                <svelte:fragment slot="summary">
                    <span class={textCSS}>Nastier Specials</span>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <ul class="list">
                        {#each combatant.nastier_traits as trait}
                            <div class={divCSS}>
                                <li>
                                    <p class={blockCSS}>
                                        <span class="italic">{trait.name}:</span>
                                        <span>{trait.desc}</span>
                                    </p>
                                </li>
                            </div>
                        {/each}
                    </ul>
                </svelte:fragment>
            </AccordionItem>
        {/if}
    </Accordion>
</section>
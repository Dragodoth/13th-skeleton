<script lang="ts">
    import type {SvelteComponent} from 'svelte';
    import {ListBox, ListBoxItem, getModalStore} from '@skeletonlabs/skeleton';
    import {battles} from "$lib/stores.ts";
    import type {Battle} from "$lib/types";

    export let parent: SvelteComponent;

    let flavor = 'chocolate';
    let battleToImport = $battles[0].id;
    const modalStore = getModalStore();

    function onFormSubmit(): void {
        // Find selected battle by name, assuming battle names are unique
        const selectedBattle = $battles.find(battle => battle.id === battleToImport);
        if ($modalStore[0].response) $modalStore[0].response(selectedBattle);
        modalStore.close();
    }

    const cBase = 'card p-4 w-modal shadow-xl space-y-4';
    const cHeader = 'text-2xl font-bold';
</script>

{#if $modalStore[0]}
    <div class="modal-example-form {cBase}">
        <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
        <article>{$modalStore[0].body ?? '(body missing)'}</article>

        <ListBox class="border border-surface-500 p-4 rounded-container-token">
            {#each $battles as battleStored, i (i)}
                <ListBoxItem rounded="" active="variant-ghost" bind:group={battleToImport} name={battleStored.id}
                             value={battleStored.id}>
                    <div class="flex justify-between p-2 m-4">
                        <div class="flex flex-col items-center gap-1 w-full">
                            <span class="flex flex-col flex-auto items-center">
			                    <h1>{battleStored.name}</h1>
			                    <span>{battleStored.description}</span>
		                    </span>
                            <div class="flex flex-wrap gap-2 p-2">
                                {#each battleStored.combatants as combatant}
                                    <span class="variant-ghost p-2 rounded-xl">{combatant.count}x {combatant.name}</span>
                                {/each}
                            </div>
                        </div>
                    </div>
                </ListBoxItem>
            {/each}
        </ListBox>

        <footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
            <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Import Battle</button>
        </footer>
    </div>
{/if}

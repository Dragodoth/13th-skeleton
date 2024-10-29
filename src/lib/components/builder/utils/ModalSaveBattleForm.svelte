<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    // Stores
    import {getModalStore} from '@skeletonlabs/skeleton';
    import {battles} from "$lib/stores.ts";
    import type {saveBattleFormData} from "$lib/types";

    // Props
    /** Exposes parent props to this component. */
    export let parent: SvelteComponent;

    const modalStore = getModalStore();

    // Form Data
    const formData: saveBattleFormData = {
        name: 'Skeleton Battle',
        description: '',
    };

    // We've created a custom submit function to pass the response and close the modal.
    function onFormSubmit(): void {
        if ($modalStore[0].response) $modalStore[0].response(formData);
        modalStore.close();
    }

    // Base Classes
    const cBase = 'card p-4 w-modal shadow-xl space-y-4';
    const cHeader = 'text-2xl font-bold';
    const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
    <div class="modal-example-form {cBase}">
        <header class={cHeader}>Battle Name</header>
        <article>Provide your battle name in the field below.</article>
        <!-- Enable for debugging: -->
        <form class="modal-form {cForm}">
            <label class="label">
                <span>Name</span>
                <input class="input" type="text" bind:value={formData.name} placeholder="Enter name..."/>
            </label>
            <label class="label">
                <span>Battle description</span>
                <textarea class="textarea" rows="1" bind:value={formData.description} placeholder='First battle in ...'/>
            </label>
            {#if $battles.length > 0}
                <h1>Saved battles</h1>
                <div>
                    <ul class="list">
                        {#each $battles as battle, i (i)}
                            <li>
                                <button class="flex-auto variant-ghost p-2">
                                    {battle.name}
                                </button>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/if}
        </form>

        <!-- prettier-ignore -->
        <footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
            <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>{parent.buttonTextSubmit}</button>
        </footer>
    </div>
{/if}
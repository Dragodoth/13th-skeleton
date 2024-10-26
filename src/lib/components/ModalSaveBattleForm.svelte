<script>
    import { SvelteComponent } from 'svelte';

    // Stores
    import { getModalStore } from '@skeletonlabs/skeleton';
    import {battleStorage, combatants} from "$lib/stores.js";

    // Props
    /** Exposes parent props to this component. */
    export let parent

    const modalStore = getModalStore();

    // Form Data
    const formData = {
        name: 'Jane Doe',
    };

    // We've created a custom submit function to pass the response and close the modal.
    function onFormSubmit() {
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
        <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
        <article>{$modalStore[0].body ?? '(body missing)'}</article>
        <!-- Enable for debugging: -->
        <form class="modal-form {cForm}">
            <label class="label">
                <span>Name</span>
                <input class="input" type="text" bind:value={formData.name} placeholder="Enter name..." />
            </label>
            <label class="label">
                <span>Battle description</span>
                <textarea class="textarea" rows="1" placeholder="First battle in ..." />
            </label>
            <div>
                <ul class="list">
                    {#each $battleStorage as battle, i (i)}
                        <li>
                            <button class="flex-auto" on:click={() => combatants.importBattles(i)}>
                                {battle.name}
                            </button>
                            <button on:click={() => battleStorage.removeBattle(i)}>
                                <i class="fa-solid fa-trash"/>
                            </button>
                        </li>
                    {/each}
                </ul>
            </div>
        </form>

        <!-- prettier-ignore -->
        <footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
            <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>{parent.buttonTextSubmit}</button>
        </footer>
    </div>
{/if}
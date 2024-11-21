<script lang="ts">
    import type { SvelteComponent } from "svelte";
    // Stores
    import { getModalStore } from "@skeletonlabs/skeleton";
    import { battle, battleStorage } from "$lib/stores.ts";
    import type { saveBattleFormData } from "$lib/types.ts";

    // Props
    /** Exposes parent props to this component. */
    interface Props {
        parent: SvelteComponent;
    }

    const { parent }: Props = $props();

    const modalStore = getModalStore();

    // Form Data
    const formData: saveBattleFormData = {
        name: $battle.name,
        description: $battle.description,
    };

    // We've created a custom submit function to pass the response and close the modal.
    function onFormSubmit(): void {
        if ($modalStore[0].response) $modalStore[0].response(formData);
        modalStore.close();
    }

    // Base Classes
    const cBase = "card p-4 w-modal max-h-screen shadow-xl space-y-4";
    const cHeader = "text-2xl font-bold";
    const cForm =
        "border border-surface-500 p-4 space-y-4 rounded-container-token";
</script>

{#if $modalStore[0]}
    <div class="modal-example-form {cBase}">
        <header class={cHeader}>Battle Name</header>
        <article>Provide your battle name in the field below.</article>
        <!-- Enable for debugging: -->
        <form class="modal-form {cForm}">
            <label class="label">
                <span>Name</span>
                <input
                    class="input"
                    type="text"
                    bind:value={formData.name}
                    placeholder="Skeleton Battle" />
            </label>
            <label class="label">
                <span>Battle description</span>
                <textarea
                    class="textarea"
                    rows="2"
                    bind:value={formData.description}
                    placeholder="First battle in ..."></textarea>
            </label>

            {#if $battleStorage.length > 0}
                <p class="h3 text-center">
                    {$battleStorage.length} Saved Battles
                </p>
                <div
                    class="card flex flex-col p-4 gap-2 max-h-96 overflow-auto">
                    {#each $battleStorage as battleStored, i (i)}
                        <div
                            class="card flex justify-between p-2 variant-ghost">
                            <div
                                class="flex flex-col items-center gap-1 w-full">
                                <span class="flex flex-col items-center gap-1">
                                    <span class="h6">{battleStored.name}</span>
                                    <span>{battleStored.description}</span>
                                </span>
                                <div
                                    class="flex flex-wrap justify-center gap-1 p-2">
                                    {#each battleStored.combatants as combatant}
                                        {#if combatant.mook}
                                            {#each combatant.combatantCount as mob}
                                                <span
                                                    class="variant-ghost-secondary p-2 rounded-xl text-sm"
                                                    >{mob.mookCount}
                                                    x {combatant.name}</span>
                                            {/each}
                                        {:else}
                                            <span
                                                class="variant-ghost-secondary p-2 rounded-xl text-sm"
                                                >{combatant.combatantCount
                                                    .length}
                                                x {combatant.name}</span>
                                        {/if}
                                    {/each}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                No Battles stored!
            {/if}
        </form>

        <footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" onclick={parent.onClose}
                >{parent.buttonTextCancel}</button>
            <button class="btn {parent.buttonPositive}" onclick={onFormSubmit}
                >{parent.buttonTextSubmit}</button>
        </footer>
    </div>
{/if}

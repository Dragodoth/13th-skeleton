<script lang="ts">
    import type {SvelteComponent} from 'svelte';
    // Stores
    import {getModalStore} from '@skeletonlabs/skeleton';
    import type {Monster, Trait, Action} from "$lib/types.ts";

    // Props
    /** Exposes parent props to this component. */
    interface Props {
        parent: SvelteComponent;
    }

    const {
        parent
    }: Props = $props();

    const modalStore = getModalStore();

    // Form Data
    let formData: Monster = $state({
        name: 'Skeleton Battle',
        ac: 0,
        basename: "",
        hp: 0,
        id: "",
        initiative: 0,
        level: 0,
        levelOrdinal: "",
        md: 0,
        pd: 0,
        preview: "",
        role: "",
        size: "",
        type: "",
        actions: [{
            name: "",
            desc: "",
            traits: [{
                name: "",
                desc: "",
            }],
        }],
        nastier_traits: [{
            name: "",
            desc: "",
        }],
        triggered_actions: [{
            name: "",
            desc: "",
            traits: [{
                name: "",
                desc: "",
            }],
        }]
    });

    function handleAddFormClick(key: string, type: string) {
        const sampleTrait: Trait = {
            name: "",
            desc: "",
        };
        const sampleAction: Action = {
            name: "",
            desc: "",
            traits: [sampleTrait],
        };

        if (!(key in formData)) {
            formData = { ...formData, [key]: type === "trait" ? [sampleTrait] : [sampleAction] };
        }

        if (type === "trait" && (key === "traits" || key === "nastier_traits")) {
            formData = {
                ...formData,
                [key]: [...(formData[key] as Trait[]), sampleTrait]
            };
        }

        if (type === "action" && (key === "actions" || key === "triggered_actions")) {
            formData = {
                ...formData,
                [key]: [...(formData[key] as Action[]), sampleAction]
            };
        }
    }


    // We've created a custom submit function to pass the response and close the modal.
    function onFormSubmit(): void {
        if ($modalStore[0].response) $modalStore[0].response(formData);
        modalStore.close();
    }

    // Base Classes
    const cBase = 'card p-4 w-modal shadow-xl space-y-4 max-h-screen overflow-auto';
    const cHeader = 'text-2xl font-bold';
    const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#snippet traitForm(parent: Monster | Action, key: string)}
    {#if parent && parent[key]}
        {#each parent[key] as trait, i (i)}
            <label class="label">
                <span>Trait Name</span>
                <input class="input" bind:value={trait.name}
                          placeholder='Name...'>
            </label>
            <label class="label">
                <span>Trait Description</span>
                <input class="input" bind:value={trait.desc}
                          placeholder='Description...'>
            </label>
        {/each}
    {/if}
    <button class="btn" onclick={() => handleAddFormClick(key, "trait")}>Add Trait</button>
{/snippet}

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
            <!--{#if formData.actions}-->
            <!--    {#each formData.actions as action, i (i)}-->
            <!--        <label class="label">-->
            <!--            <span>Action Name</span>-->
            <!--            <textarea class="textarea" rows="1" bind:value={action.name}-->
            <!--                      placeholder='Name...'></textarea>-->
            <!--        </label>-->
            <!--        <label class="label">-->
            <!--            <span>Action Description</span>-->
            <!--            <textarea class="textarea" rows="1" bind:value={formData.actions[i].desc}-->
            <!--                      placeholder='Description...'></textarea>-->
            <!--        </label>-->
            <!--    {/each}-->
            <!--{/if}-->

            {@render traitForm(formData, "traits")}


        </form>

        <!-- prettier-ignore -->
        <footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" onclick={parent.onClose}>{parent.buttonTextCancel}</button>
            <button class="btn {parent.buttonPositive}" onclick={onFormSubmit}>{parent.buttonTextSubmit}</button>
        </footer>
    </div>
{/if}
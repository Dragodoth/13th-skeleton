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
        name: "Skeleton",
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
        role: "troop",
        size: "normal",
        type: "humanoid",
    });

    function handleAddFormClick(key: string, actionTrait?: boolean, index?: number) {
        const sampleTrait: Trait = { name: "", desc: "" };
        const sampleAction: Action = { name: "", desc: "", traits: [sampleTrait] };

        let updatedFormData = { ...formData };

        if (actionTrait && (key === "actions" || key === "triggered_actions") && index) {
            const actionsCopy = [...(updatedFormData[key] as Action[])];
            const targetAction = { ...actionsCopy[index] };

            targetAction.traits = [...targetAction.traits as Trait[], sampleTrait];
            actionsCopy[index] = targetAction;

            updatedFormData[key] = actionsCopy;
        } else {
            if (!(key in updatedFormData)) {
                updatedFormData[key] = key === "traits" || key === "nastier_traits" ? [sampleTrait] : [sampleAction];
            } else {
                if (key === "traits" || key === "nastier_traits") {
                    updatedFormData[key] = [...(updatedFormData[key] as Trait[]), sampleTrait];
                }

                if (key === "actions" || key === "triggered_actions") {
                    updatedFormData[key] = [...(updatedFormData[key] as Action[]), sampleAction];
                }
            }
        }

        formData = updatedFormData;
    }

    function handleRemoveFormClick(key: string, actionTrait?: boolean, index?: number | null, traitIndex?: number ) {
        let updatedFormData = { ...formData };

        if (actionTrait && (key === "actions" || key === "triggered_actions") && index && traitIndex) {
            const actionsCopy = [...(updatedFormData[key] as Action[])];
            const targetAction = { ...actionsCopy[index] };

            targetAction.traits = (targetAction.traits as Trait[]).filter((_, i) => i !== traitIndex);
            actionsCopy[index] = targetAction;

            updatedFormData[key] = actionsCopy;
        } else {
            if (key in updatedFormData && index) {
                if (key === "traits" || key === "nastier_traits") {
                    updatedFormData[key] = (updatedFormData[key] as Trait[]).filter((_, i) => i !== index);
                }

                if (key === "actions" || key === "triggered_actions") {
                    updatedFormData[key] = (updatedFormData[key] as Action[]).filter((_, i) => i !== index);
                }
            }
        }

        formData = updatedFormData;
    }



    function onFormSubmit(): void {
        if ($modalStore[0].response) $modalStore[0].response(formData);
        modalStore.close();
    }

    // Base Classes
    const cBase = 'card p-4 w-modal shadow-xl space-y-4 max-h-screen overflow-auto';
    const cHeader = 'text-2xl font-bold';
    const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

</script>

{#snippet traitForm(parent: Monster | Action, key: string, actionKey: string, actionIndex: number | null)}
    {#if parent && parent[key]}
        {#each parent[key] as trait, i (i)}
            <div class="variant-ghost-surface rounded-xl p-2">
                <div>
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
                </div>
                <div>
                    <button class="btn" aria-label="delete-button" onclick={() => handleRemoveFormClick(key, actionKey, actionIndex, i)}><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        {/each}
    {/if}
{/snippet}

{#snippet actionForm(parent: Monster | Action, key: string)}
    {#if parent && parent[key]}
        {#each parent[key] as action, i (i)}
            <div class="variant-ghost-surface rounded-xl p-2 flex justify-between">
                <div>
                    <label class="label">
                        <span>Action Name</span>
                        <input class="input" bind:value={action.name}
                               placeholder='Name...'>
                    </label>
                    <label class="label">
                        <span>Action Description</span>
                        <input class="input" bind:value={action.desc}
                               placeholder='Description...'>
                    </label>
                    <div class="m-2 ml-4 p-2 flex flex-col gap-2">
                        {@render traitForm(action, "traits", true, i)}
                    </div>

                    <button class="btn" onclick={() => handleAddFormClick(key, true, i)}>Add Trait</button>
                </div>
                <div>
                    <button class="btn" aria-label="delete-button" onclick={() => handleRemoveFormClick(key, false, i)}><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        {/each}
    {/if}
{/snippet}

{#if $modalStore[0]}
    <div class="modal-example-form {cBase}">
        <header class={cHeader}>Custom Monster</header>
        <article>Provide stats for your custom monster in fields below.</article>
        <!-- Enable for debugging: -->
        <form class="modal-form {cForm}">
            <div class="flex flex-col w-full gap-2">
                <div class="grid grid-cols-2 gap-2">
                    <div class="flex flex-col gap-1">
                        <label class="label">
                            <span>Name</span>
                            <input class="input" type="text" bind:value={formData.name} placeholder="Enter name..."/>
                        </label>
                        <label class="label">
                            <span>Size</span>
                            <input class="input" type="text" bind:value={formData.size} placeholder="Enter size..."/>
                        </label>
                        <label class="label">
                            <span>Level</span>
                            <input class="input" type="text" bind:value={formData.level} placeholder="Enter level..."/>
                        </label>
                        <label class="label">
                            <span>Role</span>
                            <input class="input" type="text" bind:value={formData.role} placeholder="Enter role..."/>
                        </label>
                        <label class="label">
                            <span>Initiative</span>
                            <input class="input" type="text" bind:value={formData.initiative}
                                   placeholder="Enter initiative..."/>
                        </label>
                    </div>
                    <div class="flex justify-around items-center text-xl variant-ghost-surface rounded-3xl grow">
                        <div class="flex flex-col">
                            <label class="label">
                                <span>AC</span>
                                <input class="input" type="text" bind:value={formData.ac} placeholder="Enter ac..."/>
                            </label>
                            <label class="label">
                                <span>PD</span>
                                <input class="input" type="text" bind:value={formData.pd} placeholder="Enter pd..."/>
                            </label>
                            <label class="label">
                                <span>MD</span>
                                <input class="input" type="text" bind:value={formData.md} placeholder="Enter md..."/>
                            </label>
                            <label class="label">
                                <span>HP</span>
                                <input class="input" type="text" bind:value={formData.hp} placeholder="Enter hp..."/>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="card p-2 flex flex-col gap-2">
                    <span class="text-xl">Actions</span>
                    {@render actionForm(formData, "actions")}
                    <button class="btn" onclick={() => handleAddFormClick("actions")}>Add Action</button>

                    <span class="text-xl">Special triggers</span>
                    {@render actionForm(formData, "triggered_actions")}
                    <button class="btn" onclick={() => handleAddFormClick("triggered_actions")}>Add Action</button>

                    <span class="text-xl">Traits</span>
                    {@render traitForm(formData, "traits", false, null)}
                    <button class="btn" onclick={() => handleAddFormClick("traits")}>Add Trait</button>

                    <span class="text-xl">Nastier Specials</span>
                    {@render traitForm(formData, "nastier_traits", false, null)}
                    <button class="btn" onclick={() => handleAddFormClick("nastier_traits")}>Add Trait</button>
                </div>
            </div>
        </form>

        <!-- prettier-ignore -->
        <footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" onclick={parent.onClose}>{parent.buttonTextCancel}</button>
            <button class="btn {parent.buttonPositive}" onclick={onFormSubmit}>{parent.buttonTextSubmit}</button>
        </footer>
    </div>
{/if}
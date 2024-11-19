<script lang="ts">
    import type {SvelteComponent} from 'svelte';
    // Stores
    import {Accordion, AccordionItem, getModalStore} from '@skeletonlabs/skeleton';
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
        hp: 0,
        id: Date.now().toString(),
        initiative: 0,
        level: 0,
        md: 0,
        pd: 0,
        role: "troop",
        size: "normal",
        type: "humanoid",
        source: "Custom",
    });

    $effect(() => {
        formData.mook = formData.role === "mook";
    })

    const selectOptions: {
        size: string[];
        role: string[];
        [key: string]: any,
    } = {
        size: ["double-strength", "elite", "huge", "large", "normal", "triple-strength", "weakling"],
        role: ["archer", "blocker", "caster", "leader", "mook", "spoiler", "troop", "wrecker"],
    }

    function handleAddTraitFormClick(key: string, actionIndex?: number) {
        const sampleTrait: Trait = {name: "", desc: ""};

        let updatedFormData = {...formData};

        if ((key === "actions" || key === "triggered_actions") && typeof actionIndex === "number") {
            const actionsCopy = [...(updatedFormData[key] as Action[])];
            const targetAction = {...actionsCopy[actionIndex]};

            targetAction.traits = [...targetAction.traits as Trait[], sampleTrait];
            actionsCopy[actionIndex] = targetAction;

            updatedFormData[key] = actionsCopy;
        } else {
            if (!(key in updatedFormData) && (key === "traits" || key === "nastier_traits")) {
                updatedFormData[key] = [sampleTrait];
            } else {
                updatedFormData[key] = [...(updatedFormData[key] as Trait[]), sampleTrait];
            }
        }

        formData = updatedFormData;
    }

    function handleAddActionFormClick(key: string) {

        const sampleAction: Action = {name: "", desc: "", traits: [] as Trait[]};

        let updatedFormData = {...formData};

        if (!(key in updatedFormData)) {
            updatedFormData[key] = [sampleAction];
        } else {
            updatedFormData[key] = [...(updatedFormData[key] as Action[]), sampleAction];
        }

        formData = updatedFormData;
    }


    function handleRemoveTraitFormClick(key: string, index: number, actionIndex?: number) {
        let updatedFormData = {...formData};

        if (typeof actionIndex === "number" && (key === "actions" || key === "triggered_actions")) {
            const actionsCopy = [...(updatedFormData[key] as Action[])];
            const targetAction = {...actionsCopy[actionIndex]};

            targetAction.traits = (targetAction.traits as Trait[]).filter((_, i) => i !== index);
            actionsCopy[actionIndex] = targetAction;

            updatedFormData[key] = actionsCopy;
        } else {
            if (key in updatedFormData) {
                if (key === "traits" || key === "nastier_traits") {
                    updatedFormData[key] = (updatedFormData[key] as Trait[]).filter((_, i) => i !== index);
                }
            }
        }

        formData = updatedFormData;
    }

    function handleRemoveActionFormClick(key: string, index: number) {
        let updatedFormData = {...formData};

        if (key in updatedFormData && (key === "actions" || key === "triggered_actions")) {
            updatedFormData[key] = (updatedFormData[key] as Action[]).filter((_, i) => i !== index);
        }

        formData = updatedFormData;
    }


    function onFormSubmit(): void {
        if ($modalStore[0].response) $modalStore[0].response(formData);
        modalStore.close();
    }
</script>

{#snippet traitForm(parent: Monster | Action, key: string, actionKey: string | null, actionIndex: number | undefined)}
    {#if parent && parent[key]}
        {#each parent[key] as trait, i (i)}
            <div class="variant-ghost-surface rounded-xl p-2 flex justify-between">
                <div class="grow">
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
                    <button class="btn" aria-label="delete-button"
                            onclick={() => handleRemoveTraitFormClick(actionKey === "actions" || actionKey === "triggered_actions" ? actionKey : key, i, actionIndex)}>
                        <i
                                class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        {/each}
    {/if}
{/snippet}

{#snippet actionForm(parent: Monster | Action, key: string)}
    {#if parent && parent[key]}
        {#each parent[key] as action, i (i)}
            <div class="variant-ghost-surface rounded-xl p-2 flex justify-between">
                <div class="grow">
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
                        {@render traitForm(action, "traits", key, i)}
                    </div>

                    <button class="btn variant-ringed-surface" onclick={() => handleAddTraitFormClick(key, i)}>Add
                        Trait
                    </button>
                </div>
                <div>
                    <button class="btn" aria-label="delete-button" onclick={() => handleRemoveActionFormClick(key, i)}>
                        <i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        {/each}
    {/if}
{/snippet}

{#snippet textForm(type: string, key: string)}
    <div class="w-full">
        <label class="label w-full">
            <span>{type}</span>
            <input class="input" type="text" bind:value={formData[key]} placeholder={key}>
        </label>
    </div>
{/snippet}

{#snippet numberForm(type: string, key: string)}
    <div class="w-full">
        <label class="label">
            <span>{type}</span>
            <input class="input" type="number" bind:value={formData[key]} placeholder={key}>
        </label>
    </div>
{/snippet}

{#snippet selectForm(type: string, key: string)}
    <div class="w-full">
        <label class="label">
            <span>{type}</span>
            <select class="select" bind:value={formData[key]}>
                {#each selectOptions[key] as option}
                    <option value={option}>{option}</option>
                {/each}
            </select>
        </label>
    </div>
{/snippet}

{#if $modalStore[0]}
    <div class="card p-4 w-modal-wide shadow-xl space-y-4 max-h-screen overflow-auto">
        <header class="text-2xl font-bold">Custom Monster</header>
        <article>Provide stats for your custom monster in fields below.</article>
        <!-- Enable for debugging: -->
        <form class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token">
            <div class="flex flex-col items-start xl:flex-row gap-2">
                <div class="flex gap-4">
                    <div class="flex flex-col gap-2 items-center">
                        {@render textForm("Name", "name")}
                        {@render numberForm("Level", "level")}
                        {@render selectForm("Size", "size")}
                        <div class="flex gap-2 items-baseline w-full">
                            <!--{@render textForm("Role", "role")}-->
                            {@render selectForm("Role", "role")}
                            <label class="label">
                                <span>Mook</span>
                                <input class="checkbox" type="checkbox" bind:checked={formData.mook}>
                            </label>
                        </div>
                        {@render textForm("Type", "type")}
                        {@render numberForm("Initiative", "initiative")}

                    </div>
                    <div class="flex flex-col p-4 text-xl variant-ghost-surface rounded-3xl h-full ">
                        {@render numberForm("AC", "ac")}
                        {@render numberForm("PD", "pd")}
                        {@render numberForm("MD", "md")}
                        {@render numberForm("HP", "hp")}
                    </div>
                </div>
                <div class="card p-2 flex flex-col gap-2 xl:w-1/2 w-full">
                    <Accordion>
                        <AccordionItem open>
                            <svelte:fragment slot="summary">
                                <span class="text-xl">Actions</span>
                            </svelte:fragment>
                            <svelte:fragment slot="content">
                                {@render actionForm(formData, "actions")}
                                <button class="btn variant-ringed-surface"
                                        onclick={() => handleAddActionFormClick("actions")}>Add Action
                                </button>
                            </svelte:fragment>
                        </AccordionItem>

                        <AccordionItem open>
                            <svelte:fragment slot="summary">
                                <span class="text-xl">Special triggers</span>
                            </svelte:fragment>
                            <svelte:fragment slot="content">
                                {@render actionForm(formData, "triggered_actions")}
                                <button class="btn variant-ringed-surface"
                                        onclick={() => handleAddActionFormClick("triggered_actions")}>Add Special
                                    Trigger
                                </button>
                            </svelte:fragment>
                        </AccordionItem>

                        <AccordionItem open>
                            <svelte:fragment slot="summary">
                                <span class="text-xl">Traits</span>
                            </svelte:fragment>
                            <svelte:fragment slot="content">
                                {@render traitForm(formData, "traits", null, undefined)}
                                <button class="btn variant-ringed-surface"
                                        onclick={() => handleAddTraitFormClick("traits")}>Add
                                    Trait
                                </button>
                            </svelte:fragment>
                        </AccordionItem>

                        <AccordionItem open>
                            <svelte:fragment slot="summary">
                                <span class="text-xl">Nastier Specials</span>
                            </svelte:fragment>
                            <svelte:fragment slot="content">
                                {@render traitForm(formData, "nastier_traits", null, undefined)}
                                <button class="btn variant-ringed-surface"
                                        onclick={() => handleAddTraitFormClick("nastier_traits")}>Add Nastier Trait
                                </button>
                            </svelte:fragment>
                        </AccordionItem>
                    </Accordion>
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
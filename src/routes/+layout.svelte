<script lang="ts">
    import '../app.postcss';
    import '@fortawesome/fontawesome-free/css/all.min.css';
    import {arrow, autoUpdate, computePosition, flip, offset, shift} from '@floating-ui/dom';
    import {Accordion, AccordionItem, type ModalComponent} from "@skeletonlabs/skeleton";
    import {
        AppBar,
        initializeStores,
        LightSwitch,
        Modal,
        RadioGroup,
        RadioItem,
        storePopup
    } from '@skeletonlabs/skeleton';
    import ModalSaveBattleForm from "$lib/components/utils/modals/ModalSaveBattleForm.svelte";
    import ModalImportBattleList from "$lib/components/utils/modals/ModalImportBattleList.svelte";
    import ModalAddCombatant from "$lib/components/utils/modals/ModalAddCombatant.svelte";
    import {use2E} from "$lib/stores.ts";
    import ModalSaveCustomMonster from "$lib/components/utils/modals/ModalSaveCustomMonster.svelte";

    storePopup.set({computePosition, autoUpdate, offset, shift, flip, arrow});

    let {
        children
    } = $props();

    initializeStores()

    const modalRegistry: Record<string, ModalComponent> = {
        // Set a unique modal ID, then pass the component reference
        modalComponentModalSaveBattleForm: {ref: ModalSaveBattleForm},
        modalComponentModalImportBattleList: {ref: ModalImportBattleList},
        modalComponentModalAddCombatant: {ref: ModalAddCombatant},
        modalComponentSaveCustomMonster: {ref: ModalSaveCustomMonster},
        // ...
    };

    let showNav = $state(false)

    const handleNavClick = () => {
        showNav = !showNav;
    }


    const linkClass = "hover:text-primary-500";
</script>

<Modal components={modalRegistry}/>

<div class="grid h-screen grid-rows-[auto_1fr_auto] overflow-auto">
    <!-- Header -->
    <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotLead="uppercase md:text-xl"
            slotTrail="place-content-end">
        <svelte:fragment slot="lead">
			<a href="/">
                <i class="fa-regular fa-skull"></i>	13th Skeleton
			</a>
        </svelte:fragment>

        <nav class="lg:flex gap-4 xl:text-xl hidden text-nowrap items-center">
			<a href="/about" class={linkClass}>About</a>
            <a href="/compendium" class={linkClass}>Compendium</a>
            <span class="flex flex-col items-center">
                Battle
                <span class="flex gap-4 text-lg">
                    <a href="/builder" class={linkClass}>Builder</a>
			        <a href="/manager" class={linkClass}>Manager</a>
                </span>
            </span>

            <a href="/customMonsters" class={linkClass}>Custom Monsters</a>
		</nav>

        <button aria-label="navHamburger" class="lg:hidden" onclick={handleNavClick}><i class="fa-solid fa-bars"></i>
        </button>

        <svelte:fragment slot="trail">
            <label class="flex flex-col items-center">
                <span>Rules</span>
                <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary" padding="px-3 py-1">
                    <RadioItem bind:group={$use2E} name="1E" value={false}>1E</RadioItem>
                    <RadioItem bind:group={$use2E} name="2E" value={true}>2E</RadioItem>
                </RadioGroup>
            </label>
            <LightSwitch/>
        </svelte:fragment>
    </AppBar>
    <header class="p-2">
        <nav class="list-nav card p-2 {showNav ? 'flex lg:hidden' : 'hidden'}">
            <ul class="w-full">
                <li>
                    <a href="/about">
                        <span class="flex-auto">About</span>
                    </a>
                </li>
                <li>
                    <a href="/compendium">
                        <span class="flex-auto">Compendium</span>
                    </a>
                </li>
                <li>
                    <Accordion>
                        <AccordionItem>
                            <svelte:fragment slot="summary">
                                Battle
                            </svelte:fragment>
                            <svelte:fragment slot="content">
                                <ul class="w-full">
                                    <li>
                                        <a href="/builder">
                                            Builder
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/manager">
                                            Manager
                                        </a>
                                    </li>
                                </ul>
                            </svelte:fragment>
                        </AccordionItem>
                    </Accordion>
                <li>
                    <a href="/customMonsters">
                        <span class="flex-auto">Custom Monsters</span>
                    </a>
                </li>

            </ul>
        </nav>
    </header>

    <!-- Main -->
    <main class="p-4 space-y-4">
        {@render children()}
    </main>
    <!-- Footer -->
    <AppBar>
        <svelte:fragment slot="lead">
            icon
        </svelte:fragment>
        <svelte:fragment slot="trail">
            stuff
        </svelte:fragment>
    </AppBar>
</div>



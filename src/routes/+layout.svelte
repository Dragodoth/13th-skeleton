<script lang="ts">
    import '../app.postcss';
    import '@fortawesome/fontawesome-free/css/all.min.css';
    import {arrow, autoUpdate, computePosition, flip, offset, shift} from '@floating-ui/dom';
    import type {ModalComponent} from "@skeletonlabs/skeleton";
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

    let {children} = $props();


    initializeStores()

    const modalRegistry: Record<string, ModalComponent> = {
        // Set a unique modal ID, then pass the component reference
        modalComponentModalSaveBattleForm: {ref: ModalSaveBattleForm},
        modalComponentModalImportBattleList: {ref: ModalImportBattleList},
        modalComponentModalAddCombatant: {ref: ModalAddCombatant},
        modalComponentSaveCustomMonster: {ref: ModalSaveCustomMonster},
        // ...
    };

</script>

<Modal components={modalRegistry}/>

<div class="grid h-screen grid-rows-[auto_1fr_auto] overflow-auto">
    <!-- Header -->
    <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotLead="uppercase md:text-xl"
            slotTrail="place-content-end">
        <svelte:fragment slot="lead">
			<span>
                <i class="fa-regular fa-skull"></i>	13th Skeleton
			</span>
        </svelte:fragment>

        <span class="flex gap-4 md:text-xl">
            <a href="/">Home</a>
			<a href="/about">About</a>
            <a href="/compendium">Compendium</a>
			<a href="/builder">Builder</a>
			<a href="/manager">Manager</a>
            <a href="/customMonsters">Custom Monsters</a>
		</span>

        <svelte:fragment slot="trail">
            <div class="flex flex-col items-center">
                <p>Rules</p>
                <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary" padding="px-3 py-1">
                    <RadioItem bind:group={$use2E} name="1E" value={false}>1E</RadioItem>
                    <RadioItem bind:group={$use2E} name="2E" value={true}>2E</RadioItem>
                </RadioGroup>
            </div>
            <LightSwitch/>
        </svelte:fragment>
    </AppBar>
    <!-- Main -->
    <main class=" p-4 space-y-4">
        {@render children()}
    </main>
    <!-- Footer -->
    <AppBar>(footer)</AppBar>
</div>



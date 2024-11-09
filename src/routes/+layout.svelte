<script lang="ts">
    import '../app.postcss';
    import '@fortawesome/fontawesome-free/css/all.min.css';
    import {computePosition, autoUpdate, offset, shift, flip, arrow} from '@floating-ui/dom';
    import {storePopup, initializeStores, Modal} from '@skeletonlabs/skeleton';

    storePopup.set({computePosition, autoUpdate, offset, shift, flip, arrow});
    import type {ModalComponent} from "@skeletonlabs/skeleton";
    import ModalSaveBattleForm from "$lib/components/builder/utils/ModalSaveBattleForm.svelte";
    import ModalImportBattleList from "$lib/components/builder/utils/ModalImportBattleList.svelte";
    import ModalAddCombatant from "$lib/components/manager/ModalAddCombatant.svelte";
    import {use2E} from "$lib/stores.ts";
    import {
        AppBar,
        LightSwitch,
        RadioGroup,
        RadioItem,
    } from '@skeletonlabs/skeleton';


    initializeStores()

    const modalRegistry: Record<string, ModalComponent> = {
        // Set a unique modal ID, then pass the component reference
        modalComponentModalSaveBattleForm: {ref: ModalSaveBattleForm},
        modalComponentModalImportBattleList: {ref: ModalImportBattleList},
        modalComponentModalAddCombatant: {ref: ModalAddCombatant},

        // ...
    };

</script>

<Modal components={modalRegistry}/>

<div class="grid h-screen grid-rows-[auto_1fr_auto] overflow-auto">
    <!-- Header -->
    <AppBar slotLead="uppercase md:text-xl" gridColumns="grid-cols-3" slotDefault="place-self-center"
            slotTrail="place-content-end">
        <svelte:fragment slot="lead">
			<span>
                <i class="fa-solid fa-skull"></i>	13th Skeleton
			</span>
        </svelte:fragment>

        <span class="flex gap-4 md:text-xl">
            <a href="/">Home</a>
			<a href="/about">About</a>
            <a href="/compendium">Compendium</a>
			<a href="/builder">Builder</a>
			<a href="/manager">Manager</a>
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
        <slot/>
    </main>
    <!-- Footer -->
    <AppBar>(footer)</AppBar>
</div>



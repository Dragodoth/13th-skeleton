<script lang="ts">
    import type {Monster} from "$lib/types.ts";
    import {getModalStore, type ModalComponent, type ModalSettings} from "@skeletonlabs/skeleton";
    import ModalShowStatblock from "$lib/components/utils/modals/ModalShowStatblock.svelte";
    import {customMonsterStorage} from "$lib/stores.ts";
    import StatblockGrid from "$lib/components/manager/StatblockGrid.svelte";
    import AddCustomCombatantButton from "$lib/components/utils/AddCustomCombatantButton.svelte";

    const modalStore = getModalStore();

    const {
        data
    } = $props();

    const monsters = $derived($customMonsterStorage);


    function clickHandler(monster: Monster): void {
        const modalComponentShowStatblock: ModalComponent = {
            ref: ModalShowStatblock,
            props: {monsterId: monster.id}
        }
        const modal: ModalSettings = {
            type: 'component',
            component: modalComponentShowStatblock,
        };
        modalStore.trigger(modal);
    }


</script>

<StatblockGrid data={monsters}>
    <AddCustomCombatantButton/>
</StatblockGrid>

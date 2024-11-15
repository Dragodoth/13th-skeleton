<script lang="ts">
    import MonsterDatatable from "$lib/components/builder/datatable/MonsterDatatable.svelte";
    import type {Monster} from "$lib/types.ts";
    import {getModalStore, type ModalComponent, type ModalSettings} from "@skeletonlabs/skeleton";
    import ModalShowStatblock from "$lib/components/utils/modals/ModalShowStatblock.svelte";
    import {customMonsterStorage} from "$lib/stores.ts";

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

<MonsterDatatable {monsters} {clickHandler}/>
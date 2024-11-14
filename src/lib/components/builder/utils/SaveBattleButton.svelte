<script lang="ts">
    import {getModalStore} from "@skeletonlabs/skeleton";
    import type {ModalSettings, ModalComponent, ModalStore} from '@skeletonlabs/skeleton';
    import {battles} from "$lib/stores.ts";
    import type {Battle, saveBattleFormData} from "$lib/types";

    interface Props {
        battleToSave: Battle
    }

    const {
        battleToSave
    }: Props = $props();

    const modalStore: ModalStore = getModalStore();

    function handleSaveClick() {
        new Promise((resolve) => {
            const modal: ModalSettings = {
                type: 'component',
                component: 'modalComponentModalSaveBattleForm',
                response: (r: saveBattleFormData) => {
                    resolve(r as saveBattleFormData);
                }
            };
            modalStore.trigger(modal);
        })
            .then((r) => {
                const formData = r as saveBattleFormData;
                if (formData) {
                    battles.saveBattle(battleToSave, formData.name, formData.description);
                    console.log($battles);
                }

            })
            .catch((error) => {
                console.error("Error with modal:", error);
            });
    }
</script>

<button type="button" class="btn btn-sm variant-filled-success" onclick={() => handleSaveClick ()}>
    <span><i class="fa-solid fa-floppy-disk"></i></span>
    <span>Save as new Battle</span>
</button>
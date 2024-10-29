<script lang="ts">
    import { getModalStore } from "@skeletonlabs/skeleton";
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
    import { battleStorage, battle } from "$lib/stores.ts";
    import type { saveBattleFormData } from "$lib/types";

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

                    battleStorage.storeBattle($battle, formData.name, formData.description);
                    battle.updateNameAndDescription(formData.name, formData.description);
                    console.log($battleStorage);
                }

            })
            .catch((error) => {
                console.error("Error with modal:", error);
            });
    }
</script>

<button type="button" class="btn btn-sm variant-filled-success" on:click={() => handleSaveClick ()}>
    <span><i class="fa-solid fa-briefcase"/></span>
    <span>Store Battle</span>
</button>
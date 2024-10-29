<script lang="ts">
import { battles} from "$lib/stores.ts";
import {getModalStore, popup} from "@skeletonlabs/skeleton";
import type {ModalSettings} from "@skeletonlabs/skeleton";
import type {Battle, saveBattleFormData} from "$lib/types";

const popupImport = {
    event: 'click',
    target: 'popupImport',
    placement: 'bottom',
};

const modalStore = getModalStore();

function handleImportBattleClick(): void {
    new Promise((resolve) => {
        const modal: ModalSettings = {
            type: 'component',
            component: 'modalComponentModalImportBattleList',
            title: 'Import Battle',
            body: 'Choose a battle to import.',
            response: (r: Battle) => {
                resolve(r as Battle);
            }
        };
        modalStore.trigger(modal);
    }).then((r) => {
        const formData = r as Battle;
        console.log(formData);
        if (formData) {
            new Promise<boolean>((resolve) => {
                const modal: ModalSettings = {
                    type: 'confirm',
                    // Data
                    title: 'Please Confirm',
                    body: 'Are you sure you want to import battle and overwrite the current one?',
                    // TRUE if confirm pressed, FALSE if cancel pressed
                    response: (r: boolean) => resolve(r),
                };
                modalStore.trigger(modal);
            }).then((r: boolean) => {
                if (r) {
                    //battle.importBattles(formData.id);
                }
            })
        }
    })
}

</script>

<button type="button" class="btn btn-sm variant-filled-warning" on:click={handleImportBattleClick}>
    <span><i class="fa-solid fa-file"/></span>
    <span>Import Battle</span>
</button>
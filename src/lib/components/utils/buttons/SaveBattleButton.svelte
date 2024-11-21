<script lang="ts">
    import { getModalStore } from "@skeletonlabs/skeleton";
    import type { ModalSettings, ModalStore } from "@skeletonlabs/skeleton";
    import { battleStorage, battle } from "$lib/stores.ts";
    import type { saveBattleFormData } from "$lib/types.ts";

    const modalStore: ModalStore = getModalStore();

    function handleSaveClick() {
        new Promise((resolve) => {
            const modal: ModalSettings = {
                type: "component",
                component: "modalComponentModalSaveBattleForm",
                response: (r: saveBattleFormData) => {
                    resolve(r as saveBattleFormData);
                },
            };
            modalStore.trigger(modal);
        })
            .then((r) => {
                const formData = r as saveBattleFormData;
                if (formData) {
                    battleStorage.saveBattle(
                        $battle,
                        formData.name,
                        formData.description,
                    );
                }
            })
            .catch((error) => {
                console.error("Error with modal:", error);
            });
    }
</script>

<button
    type="button"
    class="btn btn-sm variant-filled-success"
    onclick={() => handleSaveClick()}>
    <span><i class="fa-solid fa-floppy-disk"></i></span>
    <span>Save Battle</span>
</button>

<script lang="ts">
    import { getModalStore } from "@skeletonlabs/skeleton";
    import type { ModalSettings } from "@skeletonlabs/skeleton";
    import type { Battle } from "$lib/types.ts";
    import { battle } from "$lib/stores";
    import ConfirmButtonModal from "./ConfirmButtonModal.svelte";

    const modalStore = getModalStore();

    function handleImportBattleClick(): void {
        new Promise((resolve) => {
            const modal: ModalSettings = {
                type: "component",
                component: "modalComponentModalImportBattleList",
                title: "Import Battle",
                body: "Choose a battle to import.",
                response: (r: Battle) => {
                    resolve(r as Battle);
                },
            };
            modalStore.trigger(modal);
        }).then((r) => {
            const formData = r as Battle;
            if (formData) {
                battle.importBattle(formData.id);
            }
        });
    }
</script>

<ConfirmButtonModal
    title="Import battle and overwrite current one?"
    handleConfirm={() => handleImportBattleClick()}
    buttonCSS="btn-sm variant-filled-warning"
    buttonIconCSS="fa-solid fa-file"
    buttonText="Import Battle" />

<hr class="w-full !border-t-2" />

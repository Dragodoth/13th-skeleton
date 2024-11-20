<script lang="ts">
    import { getModalStore, popup } from "@skeletonlabs/skeleton";
    import type { ModalSettings } from "@skeletonlabs/skeleton";
    import type { Battle } from "$lib/types.ts";
    import { battle } from "$lib/stores";

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
            console.log(formData);
            if (formData) {
                new Promise<boolean>((resolve) => {
                    const modal: ModalSettings = {
                        type: "confirm",
                        // Data
                        title: "Import battle and overwrite the current one?",
                        body: "This cannot be undone.",
                        // TRUE if confirm pressed, FALSE if cancel pressed
                        response: (r: boolean) => resolve(r),
                    };
                    modalStore.trigger(modal);
                }).then((r: boolean) => {
                    if (r) {
                        battle.importBattle(formData.id);
                    }
                });
            }
        });
    }
</script>

<button
    type="button"
    class="btn btn-sm variant-filled-warning"
    on:click={handleImportBattleClick}>
    <span><i class="fa-solid fa-file"></i></span>
    <span>Import Battle</span>
</button>

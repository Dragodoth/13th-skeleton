<script lang="ts">
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import { battle } from "$lib/stores.ts";

    const modalStore = getModalStore();

    function handleRemoveCombatantsClick() {
        new Promise<boolean>((resolve) => {
            const modal: ModalSettings = {
                type: "confirm",
                // Data
                title: "Reset battle?",
                body: "This cannot be undone.",
                // TRUE if confirm pressed, FALSE if cancel pressed
                response: (r: boolean) => resolve(r),
            };
            modalStore.trigger(modal);
        }).then((r: boolean) => {
            if (r) {
                battle.resetBattle();
            }
        });
    }
</script>

<button
    type="button"
    class="btn btn-sm variant-filled-error"
    onclick={handleRemoveCombatantsClick}>
    <span><i class="fa-solid fa-trash"></i></span>
    <span>Reset Battle</span>
</button>

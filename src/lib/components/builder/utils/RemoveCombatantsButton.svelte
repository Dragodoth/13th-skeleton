<script lang="ts">
    import {getModalStore, type ModalSettings} from "@skeletonlabs/skeleton";
    import {battles} from "$lib/stores.ts";

    interface Props {
        battleId: string;
    }

    const {
        battleId
    }: Props = $props();

    const modalStore = getModalStore();

    function handleRemoveCombatantsClick() {
        new Promise<boolean>((resolve) => {
            const modal: ModalSettings = {
                type: 'confirm',
                // Data
                title: 'Please Confirm',
                body: 'Are you sure you want to delete all combatants?',
                // TRUE if confirm pressed, FALSE if cancel pressed
                response: (r: boolean) => resolve(r),
            };
            modalStore.trigger(modal);
        }).then((r: boolean) => {
            if (r) {
                battles.updateCombatants(battleId, []);
            }
        })
    }
</script>


<button type="button" class="btn btn-sm variant-filled-error" onclick={handleRemoveCombatantsClick}>
    <span><i class="fa-solid fa-trash"></i></span>
    <span>Delete all Monsters</span>
</button>
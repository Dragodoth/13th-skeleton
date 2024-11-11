<script lang="ts">
    import {getModalStore, type ModalSettings} from "@skeletonlabs/skeleton";
    import type {Battle} from "$lib/types.ts";

    const modalStore = getModalStore();

    function handleAddCombatantClick(): void {
        const modal: ModalSettings = {
            type: 'component',
            component: 'modalComponentModalAddCombatant',
            title: 'Add Combatant',
            body: 'Choose a combatant to add to battle.',

        };
        modalStore.trigger(modal);
    }

</script>
<button type="button" class="card hover:variant-ghost-secondary flex justify-center items-center"
        aria-label="addCombatantCard" on:click={handleAddCombatantClick}>
    <i class="fa-solid fa-plus fa-10x" style="color: rgba(var(--color-surface-500));"></i>
</button>
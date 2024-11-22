<script lang="ts">
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";

    const modalStore = getModalStore();

    function handleAddEnemyClick(): void {
        const modal: ModalSettings = {
            type: "component",
            component: "modalComponentModalAddEnemy",
            title: "Add Enemy",
            body: "Choose a combatant to add to battle.",
        };
        modalStore.trigger(modal);
    }
</script>

<button
    type="button"
    class="card hover:variant-ghost-secondary flex justify-center items-center"
    aria-label="addEnemyCard"
    on:click={handleAddEnemyClick}>
    <i
        class="fa-solid fa-plus fa-10x"
        style="color: rgba(var(--color-surface-500));"></i>
</button>

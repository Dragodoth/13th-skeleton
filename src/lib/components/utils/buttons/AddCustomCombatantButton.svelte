<script lang="ts">
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import type { Monster } from "$lib/types.ts";
    import { customMonsterStorage } from "$lib/stores.ts";

    const modalStore = getModalStore();

    function handleAddCombatantClick(): void {
        new Promise((resolve) => {
            const modal: ModalSettings = {
                type: "component",
                component: "modalComponentSaveCustomMonster",
                response: (r: Monster) => {
                    resolve(r as Monster);
                },
            };
            modalStore.trigger(modal);
        })
            .then((r) => {
                const customMonster = { ...(r as Monster) };
                if (Object.keys(customMonster).length != 0) {
                    customMonsterStorage.addMonster(customMonster);
                }
            })
            .catch((error) => {
                console.error("Error with modal:", error);
            });
    }
</script>

<button
    type="button"
    class="card hover:variant-ghost-secondary flex justify-center items-center"
    aria-label="addCombatantCard"
    on:click={handleAddCombatantClick}>
    <i
        class="fa-solid fa-plus fa-10x"
        style="color: rgba(var(--color-surface-500));"></i>
</button>

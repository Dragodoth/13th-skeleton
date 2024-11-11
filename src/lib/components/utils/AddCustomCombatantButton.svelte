<script lang="ts">
    import {getModalStore, type ModalSettings} from "@skeletonlabs/skeleton";
    import type {Monster, saveBattleFormData} from "$lib/types.ts";

    const modalStore = getModalStore();

    function handleAddCombatantClick(): void {
        new Promise((resolve) => {
            const modal: ModalSettings = {
                type: 'component',
                component: 'modalComponentSaveCustomMonster',
                title: 'Add Combatant',
                body: 'Choose a combatant to add to battle.',
                response: (r: saveBattleFormData) => {
                    resolve(r as saveBattleFormData);
                }
            };
            modalStore.trigger(modal);
        })
            .then((r) => {
                const formData = r as Monster;
                if (formData) {
                    console.log(formData);
                }

            })
            .catch((error) => {
                console.error("Error with modal:", error);
            });
    }

</script>
<button type="button" class="card hover:variant-ghost-secondary flex justify-center items-center"
        aria-label="addCombatantCard" on:click={handleAddCombatantClick}>
    <i class="fa-solid fa-plus fa-10x" style="color: rgba(var(--color-surface-500));"></i>
</button>
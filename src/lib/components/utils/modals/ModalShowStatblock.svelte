<script lang="ts">
    import type {SvelteComponent} from 'svelte';
    import {getModalStore} from '@skeletonlabs/skeleton';
    import type {Monster} from "$lib/types.ts";
    import Statblock from "$lib/components/manager/Statblock.svelte";
    import {customMonsterStorage} from "$lib/stores.ts";

    // Props
    /** Exposes parent props to this component. */
    interface Props {
        parent: SvelteComponent;
        monsterId: string;
    }

    const {
        parent,
        monsterId,
    }: Props = $props();

    const modalStore = getModalStore();

    const monster = $derived($customMonsterStorage.find(m => m.id === monsterId)) as Monster

</script>

{#if $modalStore[0]}
    <div class="card p-4 w-modal-wide shadow-xl space-y-4 max-h-screen overflow-auto">
        <header class="text-2xl font-bold">Custom Monster Statblock</header>
        <button aria-label="deleteCustomMonster"
                onclick={() => {
                customMonsterStorage.removeMonster(monsterId);
                parent.onClose
            }}><i class="fa-solid fa-trash"></i></button>
        <Statblock data={monster}/>

        <!-- prettier-ignore -->
        <footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" onclick={parent.onClose}>{parent.buttonTextCancel}</button>
        </footer>
    </div>
{/if}
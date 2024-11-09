<script lang="ts">
    import type {SvelteComponent} from "svelte";
    import {getModalStore} from "@skeletonlabs/skeleton";
    import MonsterDatatable from "$lib/components/builder/datatable/MonsterDatatable.svelte";

    export let parent: SvelteComponent;

    const modalStore = getModalStore();

    const cBase = 'card p-4 w-modal shadow-xl space-y-4 h-screen';
    const cHeader = 'text-2xl font-bold';
</script>

{#if $modalStore[0]}
    <div class="modal-example-form {cBase}">
        <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
        <article>{$modalStore[0].body ?? '(body missing)'}</article>

    <div class="space-y-4 overflow-auto">
        <MonsterDatatable/>
    </div>
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
    </footer>
    </div>
{/if}
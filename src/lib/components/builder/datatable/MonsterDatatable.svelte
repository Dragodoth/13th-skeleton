<script lang="ts">
    import {battles, displayedBattleId} from "$lib/stores.ts";

    // Import local datatable components
    import ThSort from '$lib/components/builder/datatable/ThSort.svelte';
    import ThFilter from '$lib/components/builder/datatable/ThFilter.svelte';
    import Search from '$lib/components/builder/datatable/Search.svelte';
    import RowsPerPage from '$lib/components/builder/datatable/RowsPerPage.svelte';
    import RowCount from '$lib/components/builder/datatable/RowCount.svelte';
    import Pagination from '$lib/components/builder/datatable/Pagination.svelte';

    interface Props {
        monsters: Monster[];
        clickHandler: Function;
    }

    const {
        monsters,
        clickHandler
    }: Props = $props()

    // Import handler from SSD
    import {DataHandler} from '@vincjo/datatables';
    import type {Monster} from "$lib/types";
    import type {Readable} from "svelte/store";
    import type {MouseEventHandler} from "svelte/elements";

    // Init data handler - CLIENT
    const handler = new DataHandler(monsters, {rowsPerPage: 5});
    const rows: Readable<Monster[]> = handler.getRows();


    let displayedBattle = $derived($battles.find(b => b.id === $displayedBattleId) ?? null);

</script>
<div class="overflow-x-auto space-y-4">
    <header class="flex justify-between gap-4">
        <Search {handler}/>
        <RowsPerPage {handler}/>
    </header>
    <!-- Table -->
    <table class="table table-hover table-compact table-interactive w-full table-auto">
        <thead>
        <tr>
            <ThSort {handler} orderBy="name">Name</ThSort>
            <ThSort {handler} orderBy="level">Level</ThSort>
            <ThSort {handler} orderBy="size">Size</ThSort>
            <ThSort {handler} orderBy="role">Role</ThSort>
            <ThSort {handler} orderBy="type">Type</ThSort>
            <ThSort {handler} orderBy="source">Source</ThSort>
        </tr>
        <tr>
            <ThFilter {handler} filterBy="name"/>
            <ThFilter {handler} filterBy="level"/>
            <ThFilter {handler} filterBy="size"/>
            <ThFilter {handler} filterBy="role"/>
            <ThFilter {handler} filterBy="types"/>
            <ThFilter {handler} filterBy="source"/>
        </tr>
        </thead>
        <tbody>
        {#each $rows as row}
            {#if displayedBattle && displayedBattle.combatants.find(c => c.id === row.id)}
                <tr onclick={() => clickHandler(row)} class="table-row-checked">
                    <td>{row.name}</td>
                    <td>{row.level}</td>
                    <td>{row.size}</td>
                    <td>{row.role}</td>
                    <td>{row.type}</td>
                    <td>{row.source} p.{row.page}</td>
                </tr>
            {:else}
                <tr onclick={() => clickHandler(row)}>
                    <td>{row.name}</td>
                    <td>{row.level}</td>
                    <td>{row.size}</td>
                    <td>{row.role}</td>
                    <td>{row.type}</td>
                    <td>{row.source} p.{row.page}</td>
                </tr>
            {/if}
        {/each}
        </tbody>
    </table>
    <!-- Footer -->
    <footer class="flex justify-between">
        <RowCount {handler}/>
        <Pagination {handler}/>
    </footer>
</div>

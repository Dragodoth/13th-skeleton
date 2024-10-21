<script>
	import {mEqBudget, combatants, playerNumber, use2E, battleLevel} from "$lib/stores.js";
	import {ProgressBar} from "@skeletonlabs/skeleton";

	// Import local datatable components
	import ThSort from '$lib/components/ThSort.svelte';
	import ThFilter from '$lib/components/ThFilter.svelte';
	import Search from '$lib/components/Search.svelte';
	import RowsPerPage from '$lib/components/RowsPerPage.svelte';
	import RowCount from '$lib/components/RowCount.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	// Load local data
	import data from '$lib/data/monsterData.json';

	// Import handler from SSD
	import {DataHandler} from '@vincjo/datatables';

	// Init data handler - CLIENT
	const handler = new DataHandler(data, {rowsPerPage: 5});
	const rows = handler.getRows();

	let totalCost = 0;

	// React to both combatants and battleTable changes and update combatant costs
	$: {
		if ($battleLevel) {
			const updatedCombatants = combatants.updateCombatantsCost($combatants); // Calculate updated costs
			combatants.updateCombatants(updatedCombatants); // Update the combatants store with the new array
			totalCost = combatants.calculateTotalCost($combatants); // Calculate the total cost
		}
	}
</script>

<div class="overflow-x-auto space-y-4">
	<!-- Header -->
	<div class="card p-4 flex flex-col items-center gap-4">
		<header class="card-header h4">
			Battle budget: {totalCost} / {$mEqBudget[$playerNumber]}
		</header>
		<ProgressBar track="bg-surface-200-700-token w-1/3" value={totalCost} max={$mEqBudget[$playerNumber]}/>

		<section class="p-4 flex flex-wrap gap-4">
			{#each $combatants as item, i (i)}
				<aside class="alert variant-ghost">
					<!-- Message -->
					<div class="alert-message">
						<h3 class="h3">{$combatants.find(i => i.id === item.id).count}x {item.name}</h3>
						<p>Cost: {$combatants.find(i => i.id === item.id).cost.toFixed(1)}</p>
					</div>
					<!-- Actions -->
					<div class="alert-actions">
						<button type="button" class="btn btn-sm" on:click={() => combatants.removeCombatant(i)}>X
						</button>
					</div>
				</aside>
			{/each}
		</section>

		{#if $combatants.length > 0}
			<footer class="card-footer">
				<button type="button" class="btn btn-sm variant-filled" on:click={combatants.removeAllCombatants}>
					Remove all
				</button>
			</footer>
		{/if}
	</div>

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
			<ThSort {handler} orderBy="types">Types</ThSort>
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
			<tr on:click={() => combatants.addCombatant(row)}>
				<td>{row.name}</td>
				<td>{row.level}</td>
				<td>{row.size}</td>
				<td>{row.role}</td>
				<td>{row.types}</td>
				<td>{row.source} p.{row.page}</td>
			</tr>
		{/each}
		</tbody>
	</table>

	<!-- Footer -->
	<footer class="flex justify-between">
		<RowCount {handler}/>
		<Pagination {handler}/>
	</footer>
</div>

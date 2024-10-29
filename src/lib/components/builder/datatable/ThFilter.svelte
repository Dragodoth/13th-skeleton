<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	export let handler: DataHandler;
	export let filterBy: string;
	let value: string;
</script>

<th>
	<input
			class="input text-sm w-full"
			type="text"
			placeholder="Filter"
			bind:value
			on:input={() => {
			if (filterBy) {
				const filterValue = isNaN(Number(value)) ? value : Number(value);
				handler.filter(filterValue, filterBy);
			}
		}}
	/>
</th>

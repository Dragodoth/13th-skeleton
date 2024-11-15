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
			placeholder={filterBy}
			bind:value
			on:input={() => {
			if (filterBy) {
				const filterValue = value === "" ? undefined : isNaN(Number(value)) ? value : Number(value);
				handler.filter(filterValue, filterBy);
			}
		}}
	/>
</th>

<script>
	import '../app.postcss';
	import {use2E} from "$lib/stores.js";
	import { AppBar,
			SlideToggle
		 	} from '@skeletonlabs/skeleton';

</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto] overflow-auto">
	<!-- Header -->
	<AppBar slotLead="uppercase">
		<svelte:fragment slot="lead" >13th Skeleton</svelte:fragment>
		<svelte:fragment slot="trail">
			<SlideToggle name="slider-2E" size="sm" bind:value={$use2E}>Use 2E Rules</SlideToggle>
		</svelte:fragment>
	</AppBar>
	<!-- Main -->
	<main class=" p-4 space-y-4">
		<slot/>
	</main>
	<!-- Footer -->
	<AppBar>(footer)</AppBar>
</div>



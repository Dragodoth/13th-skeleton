<script>
	import '../app.postcss';
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto] overflow-auto">
	<!-- Header -->
	<AppBar slotLead="uppercase">
		<svelte:fragment slot="lead" >13th Skeleton</svelte:fragment>
		<svelte:fragment slot="trail">(actions)</svelte:fragment>
	</AppBar>
	<!-- Main -->
	<main class=" p-4 space-y-4">
		<slot/>
	</main>
	<!-- Footer -->
	<AppBar>(footer)</AppBar>
</div>



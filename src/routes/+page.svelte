<script>
    import {
        Accordion,
        AccordionItem
    } from "@skeletonlabs/skeleton";
    import Datatable from '$lib/components/MonsterDatatable.svelte';
    import BattleTable from "$lib/components/BattleTable.svelte";
    import BattleSliders from "$lib/components/BattleSliders.svelte";
</script>
<div class="card">
    <Accordion>
        <AccordionItem>
            <svelte:fragment slot="summary">Sliders</svelte:fragment>
            <svelte:fragment slot="content">
                <BattleSliders />
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
</div>
<div class="card">
    <Accordion>
        <AccordionItem>
            <svelte:fragment slot="summary">Battle Table</svelte:fragment>
            <svelte:fragment slot="content">
                <BattleTable />
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
</div>
<Datatable />
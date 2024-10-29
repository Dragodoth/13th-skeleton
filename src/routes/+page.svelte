<script>
    import {
        Accordion,
        AccordionItem
    } from "@skeletonlabs/skeleton";
    import Datatable from '$lib/components/builder/datatable/MonsterDatatable.svelte';
    import BattleTable from "$lib/components/builder/BattleTable.svelte";
    import BattleSliders from "$lib/components/builder/BattleSliders.svelte";
    import BattleMaker from "$lib/components/builder/BattleMaker.svelte";
</script>

<div class="card variant-soft">
    <Accordion>
        <AccordionItem>
            <svelte:fragment slot="summary">Sliders</svelte:fragment>
            <svelte:fragment slot="content">
                <BattleSliders />
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
</div>
<div class="card variant-soft">
    <Accordion>
        <AccordionItem>
            <svelte:fragment slot="summary">Battle Table</svelte:fragment>
            <svelte:fragment slot="content">
                <BattleTable />
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
</div>

<BattleMaker />

<Datatable />
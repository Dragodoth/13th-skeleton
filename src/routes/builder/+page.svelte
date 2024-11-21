<script lang="ts">
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
    import MonsterDatatable from "$lib/components/builder/datatable/MonsterDatatable.svelte";
    import BattleTable from "$lib/components/builder/BattleTable.svelte";
    import BattleSliders from "$lib/components/builder/BattleSliders.svelte";
    import BattleMaker from "$lib/components/builder/BattleMaker.svelte";
    import { battle } from "$lib/stores.ts";
    import type { Monster } from "$lib/types.ts";

    const { data } = $props();

    const battleId = $derived($battle);

    function clickHandler(monster: Monster) {
        battle.addCombatant(monster);
    }

    const { monsters } = data;
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

<MonsterDatatable {monsters} {clickHandler} />

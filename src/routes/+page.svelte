<script>
    import {
        Accordion,
        AccordionItem
    } from "@skeletonlabs/skeleton";
    import Datatable from '$lib/components/MonsterDatatable.svelte';
    import BattleTable from "$lib/components/BattleTable.svelte";
    import BattleSliders from "$lib/components/BattleSliders.svelte";

    let playerNumber = 4;
    let partyLevel = 1;
    let battles = 4;

    const mEqBudget = [0, 1, 2, 3, 5, 7, 9, 11];

    let battleLevel;
    let battleTable = [];
    $:{
        battleLevel = partyLevel;

        if (partyLevel >= 5) battleLevel++;
        if (partyLevel >= 8) battleLevel++;

        if (battles === 3) battleLevel++;


        battleTable = [
            {
                level: battleLevel - 2,
                normal: {
                    value: 0.5,
                    asterisk: ''
                },
                elite: {
                    value: 0.7,
                    asterisk: ''
                },
                large: {
                    value: 1,
                    asterisk: ''
                },
                huge: {
                    value: 1.5,
                    asterisk: ''
                },
            },
            {
                level: battleLevel - 1,
                normal: {
                    value: 0.7,
                    asterisk: ''
                },
                elite: {
                    value: 1,
                    asterisk: ''
                },
                large: {
                    value: 1.5,
                    asterisk: ''
                },
                huge: {
                    value: 2,
                    asterisk: ''
                }
            },
            {
                level: battleLevel,
                normal: {
                    value: 1,
                    asterisk: ''
                },
                elite: {
                    value: 1.5,
                    asterisk: ''
                },
                large: {
                    value: 2,
                    asterisk: ''
                },
                huge: {
                    value: 3,
                    asterisk: ''
                }
            },
            {
                level: battleLevel + 1,
                normal: {
                    value: 1.5,
                    asterisk: ''
                },
                elite: {
                    value: 2,
                    asterisk: '*'
                },
                large: {
                    value: 3,
                    asterisk: '*'
                },
                huge: {
                    value: 4,
                    asterisk: '*'
                }
            },
            {
                level: battleLevel + 2,
                normal: {
                    value: 2,
                    asterisk: '*'
                },
                elite: {
                    value: 3,
                    asterisk: '**'
                },
                large: {
                    value: 4,
                    asterisk: '**'
                },
                huge: {
                    value: 6,
                    asterisk: '**'
                }
            },
        ]
    }
</script>
<div class="card">
    <Accordion>
        <AccordionItem>
            <svelte:fragment slot="summary">Sliders</svelte:fragment>
            <svelte:fragment slot="content">
                <BattleSliders bind:playerNumber={playerNumber} bind:partyLevel={partyLevel} bind:battles={battles}/>
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
</div>
<div class="card">
    <Accordion>
        <AccordionItem>
            <svelte:fragment slot="summary">Battle Table</svelte:fragment>
            <svelte:fragment slot="content">
                <BattleTable {battleTable}/>
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
</div>
<Datatable bind:battleTable mEqBudget={mEqBudget[playerNumber]}/>
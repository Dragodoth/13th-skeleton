import type {BattleTableRow} from "$lib/types.js";
import {derived} from "svelte/store";

export class States {
    use2E = $state({
        value: true
    })
    partyLevel = $state({
        value: 1
    })
    playerNumber = $state({
        value: 4
    })
    battlesPerArc = $state({
        value: 4
    })

    mEqBudget = $derived(this.use2E.value ? [0, 1, 2, 3, 5, 7, 9, 11] : [0, 1, 2, 3, 4, 5, 6, 7])

    battleLevel = $derived.by(() => {
        let level = this.partyLevel.value;
        if (level >= 5) level++;
        if (level >= 8) level++;
        if (this.battlesPerArc.value === 3 && this.use2E.value) level++;
        return {
            value: level
        };
    })

    battleTable = $derived({
        value: [
            {
                level: this.battleLevel.value - 2,
                normal: {value: 0.5, asterisk: ''},
                elite: {value: 0.7, asterisk: ''},
                large: {value: 1, asterisk: ''},
                huge: {value: 1.5, asterisk: ''},
            },
            {
                level: this.battleLevel.value - 1,
                normal: {value: 0.7, asterisk: ''},
                elite: {value: 1, asterisk: ''},
                large: {value: 1.5, asterisk: ''},
                huge: {value: 2, asterisk: ''},
            },
            {
                level: this.battleLevel.value,
                normal: {value: 1, asterisk: ''},
                elite: {value: 1.5, asterisk: ''},
                large: {value: 2, asterisk: ''},
                huge: {value: 3, asterisk: ''},
            },
            {
                level: this.battleLevel.value + 1,
                normal: {value: 1.5, asterisk: ''},
                elite: {value: 2, asterisk: '*'},
                large: {value: 3, asterisk: '*'},
                huge: {value: 4, asterisk: '*'},
            },
            {
                level: this.battleLevel.value + 2,
                normal: {value: 2, asterisk: '*'},
                elite: {value: 3, asterisk: '**'},
                large: {value: 4, asterisk: '**'},
                huge: {value: 6, asterisk: '**'},
            },
        ]
    })

}


// const derives = $derived({
//     mEqBudget: states.use2E ? [0, 1, 2, 3, 5, 7, 9, 11] : [0, 1, 2, 3, 4, 5, 6, 7],
//     battleLevel,
//     battleTable: [
//         {
//             level: battleLevel - 2,
//             normal: {value: 0.5, asterisk: ''},
//             elite: {value: 0.7, asterisk: ''},
//             large: {value: 1, asterisk: ''},
//             huge: {value: 1.5, asterisk: ''},
//         },
//         {
//             level: battleLevel - 1,
//             normal: {value: 0.7, asterisk: ''},
//             elite: {value: 1, asterisk: ''},
//             large: {value: 1.5, asterisk: ''},
//             huge: {value: 2, asterisk: ''},
//         },
//         {
//             level: battleLevel,
//             normal: {value: 1, asterisk: ''},
//             elite: {value: 1.5, asterisk: ''},
//             large: {value: 2, asterisk: ''},
//             huge: {value: 3, asterisk: ''},
//         },
//         {
//             level: battleLevel + 1,
//             normal: {value: 1.5, asterisk: ''},
//             elite: {value: 2, asterisk: '*'},
//             large: {value: 3, asterisk: '*'},
//             huge: {value: 4, asterisk: '*'},
//         },
//         {
//             level: battleLevel + 2,
//             normal: {value: 2, asterisk: '*'},
//             elite: {value: 3, asterisk: '**'},
//             large: {value: 4, asterisk: '**'},
//             huge: {value: 6, asterisk: '**'},
//         },
//     ]
// });


// const use2E: boolean = $state(true);
//
// // Sliders stores
// const partyLevel: number = $state(1);
// const playerNumber: number = $state(4);
// const battlesPerArc: number = $state(4);
//
// // Monster Equivalent Values
// const mEqBudget: number[] = $derived(use2E ? [0, 1, 2, 3, 5, 7, 9, 11] : [0, 1, 2, 3, 4, 5, 6, 7]
// );
//
// // Battle level calculation based on party level and battle count
// const battleLevel: number = $derived.by(
//     () => {
//         let calculatedLevel: number = partyLevel;
//         if (partyLevel >= 5) calculatedLevel++;
//         if (partyLevel >= 8) calculatedLevel++;
//         if (battlesPerArc === 3 && use2E) calculatedLevel++;
//         return calculatedLevel;
//     }
// );
//
// // Battle Table that adjusts based on battle level
// const battleTable: BattleTableRow[] = $derived(
//     [
//         {
//             level: battleLevel - 2,
//             normal: {value: 0.5, asterisk: ''},
//             elite: {value: 0.7, asterisk: ''},
//             large: {value: 1, asterisk: ''},
//             huge: {value: 1.5, asterisk: ''}
//         },
//         {
//             level: battleLevel - 1,
//             normal: {value: 0.7, asterisk: ''},
//             elite: {value: 1, asterisk: ''},
//             large: {value: 1.5, asterisk: ''},
//             huge: {value: 2, asterisk: ''}
//         },
//         {
//             level: battleLevel,
//             normal: {value: 1, asterisk: ''},
//             elite: {value: 1.5, asterisk: ''},
//             large: {value: 2, asterisk: ''},
//             huge: {value: 3, asterisk: ''}
//         },
//         {
//             level: battleLevel + 1,
//             normal: {value: 1.5, asterisk: ''},
//             elite: {value: 2, asterisk: '*'},
//             large: {value: 3, asterisk: '*'},
//             huge: {value: 4, asterisk: '*'}
//         },
//         {
//             level: battleLevel + 2,
//             normal: {value: 2, asterisk: '*'},
//             elite: {value: 3, asterisk: '**'},
//             large: {value: 4, asterisk: '**'},
//             huge: {value: 6, asterisk: '**'}
//         }
//     ]);
//
// function refStateNumber (initial: any) {
//     let value = $state(initial);
//     return {
//         get value () { return value },
//         set value (v) { value = v }
//     }
// }
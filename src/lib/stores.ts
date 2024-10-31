import {derived, writable, get} from 'svelte/store';
import type {Writable, Readable} from 'svelte/store';
import type {Persisted, BattleTableRow, Battle, Combatant, Monster} from "$lib/types";
import {persisted} from 'svelte-persisted-store';

export const use2E: Writable<boolean> = writable(true);

// Sliders stores
export const partyLevel: Writable<number> = writable(1);
export const playerNumber: Writable<number> = writable(4);
export const battlesPerArc: Writable<number> = writable(4);

// Monster Equivalent Values
export const mEqBudget: Readable<number[]> = derived(
    use2E,
    ($use2E: boolean): number[] => $use2E ? [0, 1, 2, 3, 5, 7, 9, 11] : [0, 1, 2, 3, 4, 5, 6, 7]
);

// Battle level calculation based on party level and battle count
export const battleLevel: Readable<number> = derived(
    [partyLevel, battlesPerArc, use2E],
    ([$partyLevel, $battles, $use2E]) => {
        let calculatedLevel: number = $partyLevel;
        if ($partyLevel >= 5) calculatedLevel++;
        if ($partyLevel >= 8) calculatedLevel++;
        if ($battles === 3 && $use2E) calculatedLevel++;
        return calculatedLevel;
    }
);

// Battle Table that adjusts based on battle level
export const battleTable: Readable<BattleTableRow[]> = derived(battleLevel,
    ($battleLevel: number) => [
        {
            level: $battleLevel - 2,
            normal: {value: 0.5, asterisk: ''},
            elite: {value: 0.7, asterisk: ''},
            large: {value: 1, asterisk: ''},
            huge: {value: 1.5, asterisk: ''}
        },
        {
            level: $battleLevel - 1,
            normal: {value: 0.7, asterisk: ''},
            elite: {value: 1, asterisk: ''},
            large: {value: 1.5, asterisk: ''},
            huge: {value: 2, asterisk: ''}
        },
        {
            level: $battleLevel,
            normal: {value: 1, asterisk: ''},
            elite: {value: 1.5, asterisk: ''},
            large: {value: 2, asterisk: ''},
            huge: {value: 3, asterisk: ''}
        },
        {
            level: $battleLevel + 1,
            normal: {value: 1.5, asterisk: ''},
            elite: {value: 2, asterisk: '*'},
            large: {value: 3, asterisk: '*'},
            huge: {value: 4, asterisk: '*'}
        },
        {
            level: $battleLevel + 2,
            normal: {value: 2, asterisk: '*'},
            elite: {value: 3, asterisk: '**'},
            large: {value: 4, asterisk: '**'},
            huge: {value: 6, asterisk: '**'}
        }
    ]);

function createBattles() {
    const battles: Persisted<Battle[]> = persisted('battles', [{
        id: Date.now().toString(),
        name: 'Skeleton Battle',
        description: '',
        combatants: []
    }]);
    const {update, set} = battles;

// Battle functions

// 1. Save a new battle or update existing one by ID
    const saveBattle = (battle: Battle, newName: string, newDescription: string): void => {
        update((currentBattles: Battle[]) => {
            return [
                ...currentBattles,
                {id: Date.now().toString(), name: newName, description: newDescription, combatants: battle.combatants}
            ];
        });
    };

// 2. Remove a battle by index
    const removeBattle = (index: number): void => {
        update((currentBattles: Battle[]) => {
            currentBattles.splice(index, 1);
            return [...currentBattles];
        });
    };

// 3. Update battle's name and description
    const updateNameAndDescription = (battleId: string, newName: string, newDescription: string): void => {
        update((currentBattles: Battle[]) => {
            return currentBattles.map(battle => {
                if (battle.id !== battleId) return battle;
                return {...battle, name: newName, description: newDescription};
            });
        });
    };

// Combatant functions

// 4. Add a new combatant or update existing combatant count in a battle
    const addCombatant = (battleId: string, newCombatant: Combatant | Monster): void => {
        update((currentBattles: Battle[]) => {
            return currentBattles.map(battle => {
                if (battle.id !== battleId) return battle;

                const existingCombatant = battle.combatants.find(c => c.id === newCombatant.id);

                const updatedCombatants: Combatant[] = existingCombatant
                    ? battle.combatants.map(c =>
                        c.id === newCombatant.id
                            ? {
                                ...c,
                                count: c.count + 1,
                                currentHP: [...c.currentHP, $state(newCombatant.hp)],
                                cost: 0
                            }
                            : c
                    )
                    : [...battle.combatants, {
                        ...newCombatant,
                        count: 1,
                        currentHP: [$state(newCombatant.hp)],
                        cost: 0
                    }];

                return {...battle, combatants: updateCombatantsCost(updatedCombatants)};
            });
        });
    };

// 5. Remove a combatant by index in a battle
    const removeCombatant = (battleId: string, combatantIndex: number): void => {
        update((currentBattles: Battle[]) => {
            return currentBattles.map(battle => {
                if (battle.id !== battleId) return battle;

                const existingCombatants = battle.combatants;
                const existingCombatant = existingCombatants[combatantIndex];
                if (!existingCombatant) return battle;

                let updatedCombatants: Combatant[];

                if (existingCombatant.count > 1) {
                    existingCombatant.count--;
                    existingCombatant.currentHP.pop();
                    updatedCombatants = [...existingCombatants];
                } else {
                    updatedCombatants = existingCombatants.slice(0, combatantIndex).concat(existingCombatants.slice(combatantIndex + 1));
                }

                return {...battle, combatants: updateCombatantsCost(updatedCombatants)};
            });
        });
    };

// 6. Update combatants for a specific battle by ID
    const updateCombatants = (battleId: string, combatants: Combatant[]): void => {
        update((currentBattles: Battle[]) => {
            const battleIndex = currentBattles.findIndex(b => b.id === battleId);
            if (battleIndex === -1) return currentBattles;

            const updatedBattle: Battle = {...currentBattles[battleIndex], combatants};
            const updatedBattles = [...currentBattles];
            updatedBattles[battleIndex] = updatedBattle;
            return updatedBattles;
        });
    };

// Utility functions

// 7. Update HP of a combatant in a battle
    const updateHP = (battleId: string, combatantIndex: number, hpIndex: number, hp: number): void => {
        update((battles: Battle[]) => {
            return battles.map(battle => {
                if (battle.id === battleId) {
                    const updatedCombatants: Combatant[] = battle.combatants.map((combatant, index) => {
                        if (index === combatantIndex) {
                            const updatedHPArray = [...combatant.currentHP];
                            updatedHPArray[hpIndex] = hp;
                            return {...combatant, currentHP: updatedHPArray};
                        }
                        return combatant;
                    });
                    return {...battle, combatants: updatedCombatants};
                }
                return battle;
            });
        });
    };

// 8. Calculate total cost of combatants
    const calculateTotalCost = (combatants: Combatant[]): number =>
        parseFloat(combatants.reduce((sum, combatant) => sum + combatant.cost, 0).toFixed(1));

// 9. Update combatant costs based on battle table data
    function updateCombatantsCost(combatants: Combatant[]): Combatant[] {
        return combatants.map(combatant => {
            const battleTableData: BattleTableRow[] = get(battleTable);

            const row = battleTableData.find((item: BattleTableRow) => item.level === combatant.level) ?? null;
            const size = combatant.size === "double strength" ? "large" : combatant.size === "triple strength" ? "huge" : combatant.size;
            combatant.cost = row && size
                ? ((row[size as keyof BattleTableRow] as {
                value: number
            })?.value ?? 0) * (combatant.role === "mook" ? 0.2 : 1) * combatant.count
                : 0;

            return combatant;
        });
    }

    return {
        ...battles,
        saveBattle,
        removeBattle,
        updateNameAndDescription,
        addCombatant,
        removeCombatant,
        updateCombatants,
        updateHP,
        calculateTotalCost,
        updateCombatantsCost,
        removeAllBattles: () => set([{
            id: Date.now().toString(),
            name: 'Skeleton Battle',
            description: '',
            combatants: []
        }]),
    };
}

export const battles = createBattles();

export const displayedBattleId: Writable<string> = persisted('displayedBattleId', '');
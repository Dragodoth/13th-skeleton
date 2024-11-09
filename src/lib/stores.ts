import type {Readable, Writable} from 'svelte/store';
import {derived, get, writable} from 'svelte/store';
import type {Battle, BattleTableRow, Combatant, Monster, Persisted} from "$lib/types";
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
    const addCombatant = (battleId: string, newCombatant: Combatant | Monster | undefined): void => {
        update((currentBattles: Battle[]) => {
            if (!newCombatant) return currentBattles;
            return currentBattles.map(battle => {
                if (battle.id !== battleId) return battle;

                const existingCombatant = battle.combatants.find(c => c.id === newCombatant.id);

                const updatedCombatants: Combatant[] = existingCombatant
                    ? newCombatant.mook
                        ? battle.combatants.map((combatant: Combatant) =>
                            combatant.id === newCombatant.id
                                ? {
                                    ...combatant,
                                    combatantCount: [
                                        ...combatant.combatantCount,
                                        {
                                            id: Date.now().toString(),
                                            count: 1,
                                            currentHP: newCombatant.hp,

                                        }
                                    ],
                                    cost: 0,
                                }
                                : combatant
                        )
                        :
                        battle.combatants.map((combatant: Combatant) =>
                            combatant.id === newCombatant.id && combatant.combatantCount
                                ? {
                                    ...combatant,
                                    combatantCount:
                                        [
                                            ...combatant.combatantCount,
                                            {
                                                id: combatant.id,
                                                currentHP: combatant.hp,
                                            },
                                        ],
                                    cost: 0,
                                }
                                : combatant
                        )
                    : [...battle.combatants, {
                        ...newCombatant,
                        combatantCount: [{
                            id: newCombatant.mook ? Date.now().toString() : newCombatant.id,
                            ...(newCombatant.mook && {count: 1}),
                            currentHP: newCombatant.hp,
                        }],
                        cost: 0,
                    }];

                return {...battle, combatants: updateCombatantsCost(updatedCombatants)};
            });
        });
    };

    // const addCombatant = (battleId: string, newCombatant: Combatant | Monster | undefined): void => {
    //     update((currentBattles: Battle[]) => {
    //         if (!newCombatant) return currentBattles;
    //         return currentBattles.map(battle => {
    //             if (battle.id !== battleId) return battle;
    //
    //             const existingCombatant = battle.combatants.find(c => c.id === newCombatant.id);
    //
    //             const updatedCombatants: Combatant[] = existingCombatant && !newCombatant.mook
    //                 ? battle.combatants.map(combatant =>
    //                     combatant.id === newCombatant.id
    //                         ? {
    //                             ...combatant,
    //                             count: combatant.count + 1,
    //                             currentHP: [...combatant.currentHP, newCombatant.hp],
    //                             cost: 0
    //                         }
    //                         : combatant
    //                 )
    //                 : [...battle.combatants, {
    //                     ...newCombatant,
    //                     count: 1,
    //                     currentHP: [newCombatant.hp],
    //                     cost: 0,
    //                     ...(newCombatant.mook && { mobId: Date.now().toString() })
    //                 }];
    //
    //             return {...battle, combatants: updateCombatantsCost(updatedCombatants)};
    //         });
    //     });
    // };

// 5. Remove a combatant by index in a battle
    const removeCombatant = (battleId: string, combatantId: string | undefined): void => {
        update((currentBattles: Battle[]) => {
            if (!combatantId) return currentBattles;
            return currentBattles.map(battle => {
                if (battle.id !== battleId) return battle;

                const existingCombatant = battle.combatants.find(c => c.id === combatantId);
                if (!existingCombatant || existingCombatant.mook) return battle;

                let updatedCombatants: Combatant[];

                if (existingCombatant.combatantCount.length > 1) {
                    updatedCombatants = battle.combatants.map((combatant) =>
                        combatant.id === combatantId
                            ? {
                                ...combatant,
                                combatantCount: combatant.combatantCount.slice(0, -1),
                            }
                            : combatant
                    );
                } else {
                    updatedCombatants = [
                        ...battle.combatants.filter(c => c.id !== combatantId),
                    ];
                }

                return {
                    ...battle,
                    combatants: updateCombatantsCost(updatedCombatants) // Update cost
                };
            });
        });
    };

    const addMook = (battleId: string, newMook: Combatant, mobId: string): void => {
        update((currentBattles: Battle[]) => {
            if (!newMook || !newMook.mook || !mobId) return currentBattles;
            return currentBattles.map(battle => {
                if (battle.id !== battleId) return battle;

                const existingCombatant = battle.combatants.find(c => c.id === newMook.id);
                if (!existingCombatant) return battle;

                const updatedCombatants: Combatant[] = battle.combatants.map(combatant =>
                    combatant.id === newMook.id
                        ? {
                            ...combatant,
                            combatantCount: combatant.combatantCount.map(mob =>
                                mob.id === mobId
                                    ? {
                                        ...mob,
                                        count: (mob.count || 0) + 1,
                                        currentHP: mob.currentHP + combatant.hp
                                    }
                                    : mob
                            ),
                        }
                        : combatant
                );

                return {...battle, combatants: updateCombatantsCost(updatedCombatants)};
            });
        });
    };

    const removeMook = (battleId: string, combatantId: string, mobId: string): void => {
        update((currentBattles: Battle[]) => {
            if (!mobId) return currentBattles;
            return currentBattles.map(battle => {
                if (battle.id !== battleId) return battle;

                const existingCombatant = battle.combatants.find(c => c.id === combatantId);
                if (!existingCombatant || !existingCombatant.mook) return battle;

                const updatedCombatants: Combatant[] = battle.combatants.map(combatant =>
                    combatant.id === combatantId
                        ? {
                            ...combatant,
                            combatantCount: combatant.combatantCount.map(mob =>
                                mob.id === mobId
                                    ? {
                                        ...mob,
                                        count: (mob.count || 1) - 1, // Decrement count but keep it minimum 0
                                        currentHP: mob.currentHP - combatant.hp
                                    }
                                    : mob
                            ).filter(mob => mob.count > 0), // Remove mob entry if count goes to 0
                        }
                        : combatant
                );

                return {
                    ...battle,
                    combatants: updateCombatantsCost(updatedCombatants) // Update cost
                };
            });
        });
    };


// 6. Update combatants for a specific battle by ID
    const updateCombatants = (battleId: string, combatants: Combatant[]): void => {
        update((currentBattles: Battle[]) =>
            currentBattles.map(battle =>
                battle.id === battleId
                    ? {...battle, combatants: updateCombatantsCost(combatants)} // creates a new object, triggering reactivity
                    : battle
            )
        );
    };

// Utility functions

// 7. Update HP of a combatant in a battle
    const updateHP = (battleId: string, combatantId: string, hpIndex: number, newHp: number, mobId?: string): void => {
        update((battles: Battle[]) => {
            return battles.map(battle => {
                if (battle.id !== battleId) return battle;

                const updatedCombatants: Combatant[] = battle.combatants.map(combatant => {
                    if (combatant.id !== combatantId) return combatant;

                    const updatedCount = combatant.combatantCount.map((entry, index) => {
                        if (combatant.mook && mobId && entry.id === mobId) {
                            return {
                                ...entry,
                                currentHP: newHp,
                            };
                        }
                        if (!combatant.mook && index === hpIndex) {
                            return {
                                ...entry,
                                currentHP: newHp,
                            };
                        }
                        return entry;
                    });
                    return {
                        ...combatant,
                        combatantCount: updatedCount,
                    };
                });

                return {
                    ...battle,
                    combatants: updatedCombatants,
                };
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

            if (combatant.mook) {
                combatant.combatantCount = combatant.combatantCount.map(entry => {
                    const baseCost = row && size
                        ? ((row[size as keyof BattleTableRow] as { value: number })?.value ?? 0)
                        : 0;

                    const entryCost = baseCost * 0.2 * (entry.count || 1);

                    return {
                        ...entry,
                        mobCost: entryCost,
                    };
                });

                combatant.cost = combatant.combatantCount.reduce((total, entry) => total + (entry.mobCost || 0), 0);
            } else {
                combatant.cost = row && size
                    ? ((row[size as keyof BattleTableRow] as {
                    value: number
                })?.value ?? 0) * combatant.combatantCount.length
                    : 0;
            }

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
        addMook,
        removeMook,
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
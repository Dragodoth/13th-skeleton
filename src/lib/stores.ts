import type { Readable, Writable } from 'svelte/store';
import { derived, get, writable } from 'svelte/store';
import type { Battle, BattleTableRow, Combatant, Enemy, InitiativeCombatant, Monster, Persisted } from "$lib/types";
import { persisted } from 'svelte-persisted-store';

export const use2E: Writable<boolean> = persisted("use2E", true);

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
            normal: { value: 0.5, asterisk: '' },
            elite: { value: 0.7, asterisk: '' },
            large: { value: 1, asterisk: '' },
            huge: { value: 1.5, asterisk: '' }
        },
        {
            level: $battleLevel - 1,
            normal: { value: 0.7, asterisk: '' },
            elite: { value: 1, asterisk: '' },
            large: { value: 1.5, asterisk: '' },
            huge: { value: 2, asterisk: '' }
        },
        {
            level: $battleLevel,
            normal: { value: 1, asterisk: '' },
            elite: { value: 1.5, asterisk: '' },
            large: { value: 2, asterisk: '' },
            huge: { value: 3, asterisk: '' }
        },
        {
            level: $battleLevel + 1,
            normal: { value: 1.5, asterisk: '' },
            elite: { value: 2, asterisk: '*' },
            large: { value: 3, asterisk: '*' },
            huge: { value: 4, asterisk: '*' }
        },
        {
            level: $battleLevel + 2,
            normal: { value: 2, asterisk: '*' },
            elite: { value: 3, asterisk: '**' },
            large: { value: 4, asterisk: '**' },
            huge: { value: 6, asterisk: '**' }
        }
    ]);

function createBattle() {
    const battle: Persisted<Battle> = persisted("displayedBattle", {
        id: Date.now().toString(),
        name: "Skeleton Battle",
        description: "",
        enemies: [] as Enemy[],
    });
    const { set, update } = battle;

    const importBattle = (battleId: string): void => {
        update((currentBattle) => {
            const battleToSave: Battle | undefined = get(battleStorage).find(b => b.id === battleId)
            if (!battleToSave) return currentBattle;
            return { ...battleToSave };
        });
    }

    const addEnemy = (newEnemy: Enemy | Monster | undefined): void => {
        update((currentBattle: Battle) => {
            if (!newEnemy) return currentBattle;
            const existingEnemy = currentBattle.enemies.find(enemy => enemy.id === newEnemy.id);
            const updatedEnemies: Enemy[] = existingEnemy
                ? currentBattle.enemies.map((enemy: Enemy) =>
                    enemy.id === newEnemy.id
                        ? {
                            ...enemy,
                            combatants: [
                                ...enemy.combatants,
                                {
                                    combatantId: Date.now().toString(),
                                    ...(newEnemy.mook && { mookCount: 1 }),
                                    currentHP: newEnemy.hp,
                                    initiativeTotal: 10 +
                                        (typeof newEnemy.initiative === "number"
                                            ? newEnemy.initiative
                                            : 0)
                                }
                            ],
                            cost: 0,
                        }
                        : enemy
                )
                : [...currentBattle.enemies, {
                    ...newEnemy,
                    combatants: [{
                        combatantId: Date.now().toString(),
                        ...(newEnemy.mook && { mookCount: 1 }),
                        currentHP: newEnemy.hp,
                        initiativeTotal: 10 +
                            (typeof newEnemy.initiative === "number"
                                ? newEnemy.initiative
                                : 0)
                    }],
                    cost: 0,
                }];
            return { ...currentBattle, enemies: updateEnemiesCost(updatedEnemies) };
        });
    };

    const removeEnemy = (enemyId: string | undefined): void => {
        update((currentBattle: Battle) => {
            if (!enemyId) return currentBattle;

            const existingEnemy = currentBattle.enemies.find(enemy => enemy.id === enemyId);
            if (!existingEnemy || existingEnemy.mook) return currentBattle;

            let updatedEnemies: Enemy[];

            if (existingEnemy.combatants.length > 1) {
                updatedEnemies = currentBattle.enemies.map((enemy) =>
                    enemy.id === enemyId
                        ? {
                            ...enemy,
                            combatants: enemy.combatants.slice(0, -1),
                        }
                        : enemy
                );
            } else {
                updatedEnemies = [
                    ...currentBattle.enemies.filter(enemy => enemy.id !== enemyId),
                ];
            }

            return {
                ...currentBattle,
                enemies: updateEnemiesCost(updatedEnemies)
            };
        });
    };

    const addMook = (newMook: Enemy | undefined, combatantId: string): void => {
        update((currentBattle: Battle) => {
            if (!newMook || !newMook.mook || !combatantId) return currentBattle;


            const existingEnemy = currentBattle.enemies.find(enemy => enemy.id === newMook.id);
            if (!existingEnemy) return currentBattle;

            const updatedEnemies: Enemy[] = currentBattle.enemies.map(enemy =>
                enemy.id === newMook.id
                    ? {
                        ...enemy,
                        combatants: enemy.combatants.map(combatant =>
                            combatant.combatantId === combatantId
                                ? {
                                    ...combatant,
                                    mookCount: (combatant.mookCount || 0) + 1,
                                    currentHP: combatant.currentHP + enemy.hp
                                }
                                : combatant
                        ),
                    }
                    : enemy
            );

            return {
                ...currentBattle,
                enemies: updateEnemiesCost(updatedEnemies)
            };
        });
    };

    const removeMook = (enemyId: string | undefined, combatantId: string): void => {
        update((currentBattle: Battle) => {
            if (!enemyId || !combatantId) return currentBattle;

            const existingEnemy = currentBattle.enemies.find(enemy => enemy.id === enemyId);
            if (!existingEnemy || !existingEnemy.mook) return currentBattle;

            let updatedEnemies: Enemy[];

            if (existingEnemy.combatants.some(combatant => (combatant.mookCount ?? 0) > 1) || existingEnemy.combatants.length > 1) {
                updatedEnemies = currentBattle.enemies.map(enemy =>

                    enemy.id === enemyId
                        ? {
                            ...enemy,
                            combatants: enemy.combatants.map(combatant =>
                                combatant.combatantId === combatantId
                                    ? {
                                        ...combatant,
                                        mookCount: (combatant.mookCount || 1) - 1,
                                        currentHP: combatant.currentHP - enemy.hp
                                    }
                                    : combatant
                            ).filter(combatant => (combatant.mookCount ?? 0) > 0),
                        }
                        : enemy
                );
            } else {
                updatedEnemies = [
                    ...currentBattle.enemies.filter(enemy => enemy.id !== enemyId),
                ];
            }

            return {
                ...currentBattle,
                enemies: updateEnemiesCost(updatedEnemies) // Update cost
            };
        });
    };

    const updateEnemies = (combatants: Enemy[]): void => {
        update((currentBattle: Battle) => {
            return { ...currentBattle, enemies: updateEnemiesCost(combatants) }
        }
        )
    };

    const calculateTotalCost = (combatants: Enemy[]): number =>
        parseFloat(combatants.reduce((sum, enemy) => sum + enemy.cost, 0).toFixed(1));


    function updateEnemiesCost(combatants: Enemy[]): Enemy[] {
        return combatants.map(enemy => {
            const battleTableData: BattleTableRow[] = get(battleTable);

            const row = battleTableData.find((item: BattleTableRow) => item.level === enemy.level) ?? null;
            const size = enemy.size === "double strength" || enemy.size === "double-strength" ? "large" : enemy.size === "triple strength" || enemy.size === "triple-strength" ? "huge" : enemy.size
            if (enemy.mook) {
                enemy.combatants = enemy.combatants.map(entry => {
                    const baseCost = row && size
                        ? ((row[size as keyof BattleTableRow] as { value: number })?.value ?? 0)
                        : 0;

                    const entryCost = baseCost * 0.2 * (entry.mookCount || 1);

                    return {
                        ...entry,
                        mobCost: entryCost,
                    };
                });

                enemy.cost = enemy.combatants.reduce((total, entry) => total + (entry.mobCost || 0), 0);
            } else {
                enemy.cost = row && size
                    ? ((row[size as keyof BattleTableRow] as {
                        value: number
                    })?.value ?? 0) * enemy.combatants.length
                    : 0;
            }

            return enemy;
        });
    }

    return {
        ...battle,
        importBattle,
        addEnemy,
        removeEnemy,
        addMook,
        removeMook,
        updateEnemies,
        calculateTotalCost,
        updateEnemiesCost,
        resetBattle: () => set({
            id: Date.now().toString(),
            name: "Skeleton Battle",
            description: "",
            enemies: [] as Enemy[],
        })
    }
}

export const battle = createBattle();

function createBattleStorage() {
    const battleStorage: Persisted<Battle[]> = persisted('battles', []);
    const { update, set } = battleStorage;

    // Battle functions

    // 1. Save a new battle or update existing one by ID
    const saveBattle = (battle: Battle, newName: string, newDescription: string): void => {
        update((currentBattles: Battle[]) => {
            return [
                ...currentBattles,
                { id: battle.id, name: newName, description: newDescription, enemies: battle.enemies }
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
                return { ...battle, name: newName, description: newDescription };
            });
        });
    };

    // Enemy functions

    // 4. Add a new enemy or update existing enemy count in a battle
    const addEnemy = (battleId: string, newEnemy: Enemy | Monster | undefined): void => {
        update((currentBattles: Battle[]) => {
            if (!newEnemy) return currentBattles;

            return currentBattles.map(battle => {
                if (battle.id !== battleId) return battle;

                const existingEnemy = battle.enemies.find(enemy => enemy.id === newEnemy.id);

                const updatedEnemies: Enemy[] = existingEnemy
                    ? battle.enemies.map((enemy: Enemy) =>
                        enemy.id === newEnemy.id
                            ? {
                                ...enemy,
                                combatants: [
                                    ...enemy.combatants,
                                    {
                                        combatantId: Date.now().toString(),
                                        ...(newEnemy.mook && { mookCount: 1 }),
                                        currentHP: newEnemy.hp,
                                        initiativeTotal: 10 +
                                            (typeof newEnemy.initiative === "number"
                                                ? newEnemy.initiative
                                                : 0)

                                    }
                                ],
                                cost: 0,
                            }
                            : enemy
                    )

                    : [...battle.enemies, {
                        ...newEnemy,
                        combatants: [{
                            combatantId: Date.now().toString(),
                            ...(newEnemy.mook && { mookCount: 1 }),
                            currentHP: newEnemy.hp,
                            initiativeTotal: 10 +
                                (typeof newEnemy.initiative === "number"
                                    ? newEnemy.initiative
                                    : 0)
                        }],
                        cost: 0,
                    }];

                return { ...battle, enemies: updatedEnemies };
            });
        });
    };

    // 5. Remove a enemy by index in a battle
    const removeEnemy = (battleId: string, enemyId: string | undefined): void => {
        update((currentBattles: Battle[]) => {
            if (!enemyId) return currentBattles;
            return currentBattles.map(battle => {
                if (battle.id !== battleId) return battle;

                const existingEnemy = battle.enemies.find(enemy => enemy.id === enemyId);
                if (!existingEnemy || existingEnemy.mook) return battle;

                let updatedEnemies: Enemy[];

                if (existingEnemy.combatants.length > 1) {
                    updatedEnemies = battle.enemies.map((enemy) =>
                        enemy.id === enemyId
                            ? {
                                ...enemy,
                                combatants: enemy.combatants.slice(0, -1),
                            }
                            : enemy
                    );
                } else {
                    updatedEnemies = [
                        ...battle.enemies.filter(enemy => enemy.id !== enemyId),
                    ];
                }

                return {
                    ...battle,
                    enemies: updatedEnemies // Update cost
                };
            });
        });
    };

    const addMook = (battleId: string, newMook: Enemy | undefined, combatantId: string): void => {
        update((currentBattles: Battle[]) => {
            if (!newMook || !newMook.mook || !combatantId) return currentBattles;
            return currentBattles.map(battle => {
                if (battle.id !== battleId) return battle;

                const existingEnemy = battle.enemies.find(enemy => enemy.id === newMook.id);
                if (!existingEnemy) return battle;

                const updatedEnemies: Enemy[] = battle.enemies.map(enemy =>
                    enemy.id === newMook.id
                        ? {
                            ...enemy,
                            combatants: enemy.combatants.map(combatant =>
                                combatant.combatantId === combatantId
                                    ? {
                                        ...combatant,
                                        mookCount: (combatant.mookCount || 0) + 1,
                                        currentHP: combatant.currentHP + enemy.hp
                                    }
                                    : combatant
                            ),
                        }
                        : enemy
                );

                return { ...battle, enemies: updatedEnemies };
            });
        });
    };

    const removeMook = (battleId: string, enemyId: string | undefined, combatantId: string): void => {
        update((currentBattles: Battle[]) => {
            if (!enemyId || !combatantId) return currentBattles;
            return currentBattles.map(battle => {
                if (battle.id !== battleId) return battle;

                const existingEnemy = battle.enemies.find(enemy => enemy.id === enemyId);
                if (!existingEnemy || !existingEnemy.mook) return battle;

                let updatedEnemies: Enemy[];

                if (existingEnemy.combatants.some(combatant => (combatant.mookCount ?? 0) > 1) || existingEnemy.combatants.length > 1) {
                    updatedEnemies = battle.enemies.map(enemy =>

                        enemy.id === enemyId
                            ? {
                                ...enemy,
                                combatants: enemy.combatants.map(combatant =>
                                    combatant.combatantId === combatantId
                                        ? {
                                            ...combatant,
                                            mookCount: (combatant.mookCount || 1) - 1,
                                            currentHP: combatant.currentHP - enemy.hp
                                        }
                                        : combatant
                                ).filter(combatant => (combatant.mookCount ?? 0) > 0),
                            }
                            : enemy
                    );
                } else {
                    updatedEnemies = [
                        ...battle.enemies.filter(enemy => enemy.id !== enemyId),
                    ];
                }

                return {
                    ...battle,
                    enemies: updatedEnemies
                };
            });
        });
    };


    // 6. Update enemies for a specific battle by ID
    const updateEnemies = (battleId: string, enemies: Enemy[]): void => {
        update((currentBattles: Battle[]) =>
            currentBattles.map(battle =>
                battle.id === battleId
                    ? { ...battle, enemies: enemies }
                    : battle
            )
        );
    };

    // Utility functions

    // 7. Update HP of a enemy in a battle
    const updateHP = (battleId: string, enemyId: string, newHp: number, combatantId: string): void => {
        update((battles: Battle[]) => {
            return battles.map(battle => {
                if (battle.id !== battleId) return battle;

                const updatedEnemies: Enemy[] = battle.enemies.map(enemy => {
                    if (enemy.id !== enemyId) return enemy;

                    const updatedCombatants = enemy.combatants.map(combatant =>
                        combatant.combatantId === combatantId ?
                            {
                                ...combatant,
                                currentHP: newHp,
                            }
                            : combatant
                    );
                    return {
                        ...enemy,
                        combatants: updatedCombatants,
                    };
                });

                return {
                    ...battle,
                    enemies: updatedEnemies,
                };
            });
        });
    };



    // 9. Update enemy costs based on battle table data
    // function updateEnemiesCost(enemies: Enemy[]): Enemy[] {
    //     return enemies.map(enemy => {
    //         const battleTableData: BattleTableRow[] = get(battleTable);

    //         const row = battleTableData.find((item: BattleTableRow) => item.level === enemy.level) ?? null;
    //         const size = enemy.size === "double strength" || "double-strength" ? "large" : enemy.size === "triple strength" || "triple-strength" ? "huge" : enemy.size;
    //         console.log(enemy, size)
    //         if (enemy.mook) {
    //             enemy.combatants = enemy.combatants.map(entry => {
    //                 const baseCost = row && size
    //                     ? ((row[size as keyof BattleTableRow] as { value: number })?.value ?? 0)
    //                     : 0;

    //                 const entryCost = baseCost * 0.2 * (entry.mookCount || 1);

    //                 return {
    //                     ...entry,
    //                     mobCost: entryCost,
    //                 };
    //             });

    //             enemy.cost = enemy.combatants.reduce((total, entry) => total + (entry.mobCost || 0), 0);
    //         } else {
    //             enemy.cost = row && size
    //                 ? ((row[size as keyof BattleTableRow] as {
    //                     value: number
    //                 })?.value ?? 0) * enemy.combatants.length
    //                 : 0;
    //         }

    //         return enemy;
    //     });
    // }

    const updateInitiative = (battleId: string, enemyId: string, newInitiative: number, combatantId: string): void => {
        update((battles: Battle[]) => {
            return battles.map(battle => {
                if (battle.id !== battleId) return battle;

                const updatedEnemies: Enemy[] = battle.enemies.map(enemy => {
                    if (enemy.id !== enemyId) return enemy;

                    const updatedCombatants = enemy.combatants.map(combatant =>
                        combatant.combatantId === combatantId ?
                            {
                                ...combatant,
                                initiativeTotal: newInitiative,
                            }
                            : combatant
                    );
                    return {
                        ...enemy,
                        combatants: updatedCombatants,
                    };
                });


                return {
                    ...battle,
                    enemies: updatedEnemies,
                };
            });
        });
    };

    return {
        ...battleStorage,
        saveBattle,
        removeBattle,
        updateNameAndDescription,
        addEnemy,
        removeEnemy,
        addMook,
        removeMook,
        updateEnemies,
        updateHP,
        updateInitiative,
        //updateEnemiesCost,
        removeAllBattles: () => set([]),
    };
}

export const battleStorage = createBattleStorage();

export const displayedBattleId: Writable<string> = persisted('displayedBattleId', '');

function createCustomMonsterStorage() {
    const customMonsterStorage: Persisted<Monster[]> = persisted('customMonsterStorage', [])
    const { update, set } = customMonsterStorage;

    const addMonster = (monster: Monster) => {
        update((currentStorage: Monster[]) => {
            return [...currentStorage, monster];
        })
    }

    const removeMonster = (monsterId: string) => {
        update((currentStorage: Monster[]) => {
            const updatedStorage: Monster[] = currentStorage.filter((monster: Monster) => monster.id !== monsterId);
            return [...updatedStorage];
        })
    }

    return {
        ...customMonsterStorage,
        addMonster,
        removeMonster,
        removeAllMonsters: () => set([])
    }
}

export const customMonsterStorage = createCustomMonsterStorage();

function createHeroCombatants() {
    const heroCombatants: Persisted<InitiativeCombatant[]> = persisted("heroCombatants", []);
    const { update, set } = heroCombatants;

    const addCombatant = (newCombatant: InitiativeCombatant) => {
        update((currentCombatants: InitiativeCombatant[]) => {
            return [...currentCombatants, newCombatant]
        })
    }

    const removeCombatant = (combatantId: string) => {
        update((currentCombatants: InitiativeCombatant[]) => {
            const updatedCombatants = [
                ...currentCombatants.filter(combatant => combatant.combatantId !== combatantId),
            ];
            return [...updatedCombatants]
        })
    }

    const updateInitiative = (newInitiative: number, combatantId: string): void => {
        update((currentCombatants: InitiativeCombatant[]) => {
            console.log(currentCombatants.find(combatant => combatant.combatantId === combatantId))
            return currentCombatants.map(combatant =>
                combatant.combatantId === combatantId ?
                    {
                        ...combatant,
                        initiative: newInitiative,
                    }
                    : combatant
            );
        });
    }

    return {
        ...heroCombatants,
        addCombatant,
        removeCombatant,
        updateInitiative,
        removeCombatants: () => set([]),
    }
}

export const heroCombatants = createHeroCombatants();
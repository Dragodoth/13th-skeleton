import { derived, writable, readable, get } from 'svelte/store';

//
export const use2E = writable(false);

// Sliders stores
export const partyLevel = writable(1);
export const playerNumber = writable(4);
export const battles = writable(4);

// Battle level calculation based on party level and battle count
export const battleLevel = derived(
    [partyLevel, battles],
    ([$partyLevel, $battles]) => {
        let calculatedLevel = $partyLevel;
        if ($partyLevel >= 5) calculatedLevel++;
        if ($partyLevel >= 8) calculatedLevel++;
        if ($battles === 3) calculatedLevel++;
        return calculatedLevel;
    }
);

// Battle Table that adjusts based on battle level
export const battleTable = derived(battleLevel, $battleLevel => [
    {
        level: $battleLevel - 2,
        normal: { value: 0.5, asterisk: '' },
        elite: { value: 0.7, asterisk: '' },
        large: { value: 1, asterisk: '' },
        huge: { value: 1.5, asterisk: '' },
    },
    {
        level: $battleLevel - 1,
        normal: { value: 0.7, asterisk: '' },
        elite: { value: 1, asterisk: '' },
        large: { value: 1.5, asterisk: '' },
        huge: { value: 2, asterisk: '' },
    },
    {
        level: $battleLevel,
        normal: { value: 1, asterisk: '' },
        elite: { value: 1.5, asterisk: '' },
        large: { value: 2, asterisk: '' },
        huge: { value: 3, asterisk: '' },
    },
    {
        level: $battleLevel + 1,
        normal: { value: 1.5, asterisk: '' },
        elite: { value: 2, asterisk: '*' },
        large: { value: 3, asterisk: '*' },
        huge: { value: 4, asterisk: '*' },
    },
    {
        level: $battleLevel + 2,
        normal: { value: 2, asterisk: '*' },
        elite: { value: 3, asterisk: '**' },
        large: { value: 4, asterisk: '**' },
        huge: { value: 6, asterisk: '**' },
    },
]);

// Monster Equivalent Values
export const mEqBudget = readable([0, 1, 2, 3, 5, 7, 9, 11]);

// Combatants store
export function createCombatants() {
    const { subscribe, set, update } = writable([]);

    function updateCombatantsCost(combatants) {
        const battleTableData = get(battleTable);
        return combatants.map(combatant => {
            const row = battleTableData.find(i => i.level === combatant.level);
            combatant.cost = row
                ? (combatant.role === "mook"
                ? row[combatant.size]?.value / 5
                : row[combatant.size]?.value) * combatant.count
                : 0;
            return combatant;
        });
    }

    const addCombatant = (item) => update(combatants => {
        const existing = combatants.find(i => i.id === item.id);
        const row = get(battleTable).find(i => i.level === item.level);
        const cost = row ? (item.role === "mook" ? row[item.size]?.value / 5 : row[item.size]?.value) : 0;

        return existing
            ? combatants.map(c => c.id === item.id ? { ...c, count: c.count + 1, cost: c.cost + cost } : c)
            : [...combatants, { ...item, count: 1, cost }];
    });

    const removeCombatant = (i) => update(combatants => {
        const combatant = combatants[i];
        if (!combatant) return combatants;

        if (combatant.count > 1) {
            combatant.count--;
            combatant.cost -= combatant.cost / combatant.count; // Adjust cost
        } else {
            combatants.splice(i, 1);
        }

        return updateCombatantsCost([...combatants]);
    });

    const calculateTotalCost = (combatants) =>
        combatants.reduce((sum, combatant) => sum + combatant.cost, 0).toFixed(1);

    return {
        subscribe,
        updateCombatantsCost,
        addCombatant,
        removeCombatant,
        calculateTotalCost,
        removeAllCombatants: () => set([]),
        updateCombatants: set
    };
}

export const combatants = createCombatants();

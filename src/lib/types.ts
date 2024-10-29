import type { Writable } from 'svelte/store';

export interface Persisted<T> extends Writable<T> {
}

export type BattleTableRow = {
    level: number,
    normal: {
        value: number,
        asterisk: string
    },
    elite: {
        value: number,
        asterisk: string
    },
    large: {
        value: number,
        asterisk: string
    },
    huge: {
        value: number,
        asterisk: string
    }
};

export type Monster = {
    id: number,
    name: string,
    size: string,
    level: number,
    levelOrdinal: string,
    role: string,
    type: string,
    initiative: number | string,
    actions?: {
        name: string,
        desc: string,
        traits?: {
            name: string,
            desc: string,
        }[]
    }[],
    traits?: {
        name: string,
        desc: string,
    }[],
    nastier_traits?: {
        name: string,
        desc: string,
    }[],
    triggered_actions?: {
        name: string,
        desc: string,
        traits?: {
            name: string,
            desc: string,
        }[]
    }[],
    ac: number,
    pd: number,
    md: number,
    hp: number,
    preview: string,
    basename: string,
    page?: number,
    source?: string,
    mook?: string,
}

export type Combatant = Monster & {
    count: number,
    currentHP: number[],
    cost: number
};

export type Battle = {
    id: string,
    name: string,
    description: string,
    combatants: Combatant[],
}

export type saveBattleFormData = {
    name: string,
    description: string,
};

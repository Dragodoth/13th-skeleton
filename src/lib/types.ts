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

export type Trait = {
    name: string,
    desc: string,
};

export type Action = {
    name: string,
    desc: string,
    traits?: Trait[],
    [key: string]: any,
}

export type Monster = {
    id: string,
    name: string,
    size: string,
    level: number,
    levelOrdinal: string,
    role: string,
    type: string,
    initiative: number | string,
    actions?: Action[],
    traits?: Trait[],
    nastier_traits?: Trait[],
    triggered_actions?: Action[],
    ac: number,
    pd: number,
    md: number,
    hp: number,
    preview: string,
    basename: string,
    page?: number,
    source?: string,
    mook?: boolean,
    [key: string]: any,
}

export type Combatant = Monster & {
    combatantCount: {
        id: string,
        mookCount?: number,
        mobCost?: number,
        currentHP: number,
    }[]
    cost: number,
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

export type Metadata = {
    aliases: string[];
    created: Date;
    level: number;
    publish: Date | null;
    role: string;
    statblock: string;
    strength: string;
    tags: string[];
    type: string;
    updated: Date;
}

export type MarkdownPage = {
    meta: Metadata;
    content: string;
    path: string;
}

export type FolderStructureType = {
    [key: string]: FolderStructureType | string;
};
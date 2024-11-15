import {customMonsterStorage} from "$lib/stores";
import {get} from "svelte/store";
import monstersSRD from '$lib/data/13th-Age-SRD/compendium/Bestiary/bestiarySRD.json';
import type {Monster} from "$lib/types.ts";

export const load =  () => {
    const customMonsterData = get(customMonsterStorage);
    return {
        monsters: [...monstersSRD, ...customMonsterData] as Monster[]
    }
}
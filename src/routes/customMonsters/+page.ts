import {customMonsterStorage} from "$lib/stores";
import {get} from "svelte/store";
import type {Monster} from "$lib/types.ts";

export const load =  () => {
    const customMonsterData = get(customMonsterStorage);
    //customMonsterStorage.removeAllMonsters()
    console.log(customMonsterData);
    return {
        monsters: [...customMonsterData] as Monster[]
    }
}
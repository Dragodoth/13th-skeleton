import {battleStorage} from "$lib/stores";
import {get} from "svelte/store";

export const load =  ({params}) => {

    const battleData = get(battleStorage).find(b => b.id === params.battleId) ?? null;
    return {
        battleData: battleData
    }
}
import {battles} from "$lib/stores";
import {get} from "svelte/store";

export const load =  () => {

    const battleStoredData = get(battles);
    return {
        battleStoredData: battleStoredData
    }
}
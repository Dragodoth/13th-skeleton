import { battleStorage } from "$lib/stores";
import { get } from "svelte/store";

export const load = () => {

    const battleStoredData = get(battleStorage);
    return {
        battleStoredData: battleStoredData
    }
}
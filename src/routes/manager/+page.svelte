<script lang="ts">
    import {battleStorage} from "$lib/stores";
    import BattleManager from "$lib/components/manager/BattleManager.svelte";

    export let data;
    $: battleStoredData = data.battleStoredData;

</script>
<BattleManager/>



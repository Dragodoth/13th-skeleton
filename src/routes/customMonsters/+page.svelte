<script lang="ts">
    import { customMonsterStorage } from "$lib/stores.ts";
    import StatblockGrid from "$lib/components/manager/StatblockGrid.svelte";
    import AddCustomCombatantButton from "$lib/components/utils/buttons/AddCustomCombatantButton.svelte";

    const monsters = $derived($customMonsterStorage);
</script>

<StatblockGrid data={monsters}>
    <AddCustomCombatantButton />
</StatblockGrid>

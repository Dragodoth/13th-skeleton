<script>
    export let items, item, i;
    import {battle} from "$lib/stores.ts";
</script>
<aside class="alert variant-ghost flex flex-row gap-2">
    <!-- Message -->
    <div class="alert-message">
        <h3 class="h3">{items.find(i => i.id === item.id).count}x {item.name}</h3>
        <p>Cost: {parseFloat(items.find(i => i.id === item.id).cost.toFixed(1))}</p>
    </div>
    <!-- Actions -->
    <div class="alert-actions">
        <button type="button" class="btn btn-sm variant-ghost" on:click={() => battle.addCombatant(item)}><i class="fa-solid fa-plus" /></button>
        <button type="button" class="btn btn-sm variant-ghost" on:click={() => battle.removeCombatant(i)}><i class="fa-solid fa-minus" /></button>
    </div>
</aside>
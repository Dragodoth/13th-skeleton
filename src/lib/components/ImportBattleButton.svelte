<script>
import {combatants, battleStorage} from "$lib/stores.js";
import {popup} from "@skeletonlabs/skeleton";

const popupImport = {
    event: 'click',
    target: 'popupImport',
    placement: 'bottom',
};
</script>

<button type="button" class="btn btn-sm variant-filled-warning" use:popup={popupImport}>
    <span><i class="fa-solid fa-file"/></span>
    <span>Import Battle</span>
</button>
<!-- Popup-->
<div class="card p-4 w-72 shadow-xl" data-popup="popupImport">
    <div>
        <ul class="list">
            {#each $battleStorage as battle, i}
                <li>
                    <button class="flex-auto"
                            on:click={() => combatants.importBattles(i)}>{battle.name}</button>
                </li>
            {/each}
        </ul>
    </div>
    <div class="arrow bg-surface-100-800-token"/>
</div>
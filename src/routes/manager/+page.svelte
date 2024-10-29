<script lang="ts">
    import {battles} from "$lib/stores";

    export let data;
    $: battleStoredData = data.battleStoredData;

</script>
<section class="section grid lg:grid-cols-2 gap-2 ">
    {#if battleStoredData.length > 0}
        {#each battleStoredData as battleStored, i (i)}
            <a href="/manager/{battleStored.id}">
                <div class="card flex justify-between p-4 variant-ghost">
                    <div class="flex flex-col items-center gap-1 w-full">
                            <span class="flex flex-col items-center gap-2">
			                    <span class="h2">{battleStored.name}</span>
                                <span>{battleStored.description}</span>
		                    </span>
                        <div class="flex flex-wrap gap-2 p-2">
                            {#each battleStored.combatants as combatant}
                                <span class="variant-ghost-secondary p-2 rounded-xl">{combatant.count}x {combatant.name}</span>
                            {/each}
                        </div>
                    </div>
                    {#if battleStoredData.length > 1}
                        <button on:click={() => battles.removeBattle(i)}>
                            <i class="fa-solid fa-trash"/>
                        </button>
                    {/if}
                </div>
            </a>
        {/each}
    {:else}
        No Battles stored!
    {/if}
</section>



<script>
    import {battles} from "$lib/stores.ts";
</script>

<section class="section grid lg:grid-cols-2 gap-2 ">
    {#if $battles.length > 0}
        {#each $battles as battleStored, i (i)}
            <a href="/manager/{battleStored.id}">
                <div class="card flex justify-between p-4 variant-ghost">
                    <div class="flex flex-col items-center gap-1 w-full">
                            <span class="flex flex-col items-center gap-2">
			                    <span class="h2">{battleStored.name}</span>
                                <span>{battleStored.description}</span>
		                    </span>
                        <div class="flex flex-wrap gap-2 p-2">
                            {#each battleStored.combatants as combatant}
                                {#if combatant.mook}
                                    {#each combatant.combatantCount as mob}
                                        <span class="variant-ghost-secondary p-2 rounded-xl">{mob.mookCount}
                                            x {combatant.name}</span>
                                    {/each}
                                {:else}
                                    <span class="variant-ghost-secondary p-2 rounded-xl">{combatant.combatantCount.length}
                                        x {combatant.name}</span>
                                {/if}
                            {/each}
                        </div>
                    </div>
                    {#if $battles.length > 1}
                        <button aria-label="removeBattleButton" on:click={() => battles.removeBattle(i)}>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    {/if}
                </div>
            </a>
        {/each}
    {:else}
        No Battles stored!
    {/if}
</section>
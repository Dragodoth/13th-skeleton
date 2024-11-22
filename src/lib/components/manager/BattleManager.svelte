<script>
    import { battleStorage } from "$lib/stores.ts";
</script>

<section class="section grid lg:grid-cols-2 gap-2">
    {#if $battleStorage.length > 0}
        {#each $battleStorage as battleStored, i (i)}
            <div class="card flex p-4 variant-ghost w-full">
                <a
                    href="/manager/{battleStored.id}"
                    class="flex flex-col items-center grow">
                    <span class="flex flex-col items-center gap-2">
                        <span class="h2">{battleStored.name}</span>
                        <span>{battleStored.description}</span>
                    </span>
                    <div class="flex flex-wrap gap-2 p-2">
                        {#each battleStored.enemies as enemy}
                            {#if enemy.mook}
                                {#each enemy.combatants as combatant}
                                    <span
                                        class="variant-ghost-secondary p-2 rounded-xl"
                                        >{combatant.mookCount}
                                        x {enemy.name}</span>
                                {/each}
                            {:else}
                                <span
                                    class="variant-ghost-secondary p-2 rounded-xl"
                                    >{enemy.combatants.length}
                                    x {enemy.name}</span>
                            {/if}
                        {/each}
                    </div>
                </a>
                <button
                    aria-label="removeBattleButton"
                    on:click={() => battleStorage.removeBattle(i)}>
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        {/each}
    {:else}
        No Battles stored!
    {/if}
</section>

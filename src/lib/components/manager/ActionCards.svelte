<script lang="ts">
    export let actions, divCSS, blockCSS;
</script>

<ul class="list">
    {#each actions as action}
        <li>
            <div class={divCSS}>
                <p class={blockCSS}>
                    <span class="font-bold">{action.name}</span> - <span>{action.desc}</span>
                </p>
                {#if action.traits}
                    <ul class="list">
                        {#each action.traits as trait}
                            <li>
                                <p class={blockCSS}>
                                    <span class="italic">{trait.name}:</span>
                                    <span>{trait.desc}</span>
                                </p>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>
        </li>
    {/each}
</ul>
<script lang="ts">
    export let traits, divCSS, blockCSS;
</script>

<ul class="list">
    {#each traits as trait}
        <li>
            <div class={divCSS}>
                <p class={blockCSS}>
                    <span class="italic">{trait.name}:</span>
                    <span>{trait.desc}</span>
                </p>
            </div>
        </li>
    {/each}
</ul>
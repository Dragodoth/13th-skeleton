<script lang="ts">
    import type {Trait} from "$lib/types.ts";

    interface Props {
        traits: Trait[],
        divCSS: string;
        blockCSS: string;
    }

    const {
        traits,
        divCSS,
        blockCSS
    }: Props = $props();
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
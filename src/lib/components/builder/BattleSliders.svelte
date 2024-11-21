<script lang="ts">
    import { RangeSlider } from "@skeletonlabs/skeleton";
    import {
        playerNumber,
        partyLevel,
        battlesPerArc,
        use2E,
    } from "$lib/stores.ts";

    const gridCols = $derived($use2E ? "lg:grid-cols-3" : "lg:grid-cols-2");

    const labelCSS = "font-bold";
    const numberCSS = "font-bold";
</script>

<div class="ranges-container m-4 flex flex-col lg:grid {gridCols} gap-4">
    <RangeSlider
        name="range-slider-playerNumber"
        bind:value={$playerNumber}
        min={1}
        max={7}
        step={1}
        ticked>
        <div class="flex items-center gap-2">
            <span class={labelCSS}>Number of players:</span>
            <span class={numberCSS}>{$playerNumber}</span>
        </div>
    </RangeSlider>
    <RangeSlider
        name="range-slider-partyLevel"
        bind:value={$partyLevel}
        min={1}
        max={10}
        step={1}
        ticked>
        <div class="flex items-center gap-2">
            <span class={labelCSS}>Party Level:</span>
            <span class={numberCSS}>{$partyLevel}</span>
        </div>
    </RangeSlider>
    {#if $use2E}
        <RangeSlider
            name="range-slider-battles"
            bind:value={$battlesPerArc}
            min={3}
            max={4}
            step={1}
            ticked>
            <div class="flex items-center gap-2">
                <span class={labelCSS}
                    >Number of battles before Full Heal-up:</span>
                <span class={numberCSS}>{$battlesPerArc}</span>
            </div>
        </RangeSlider>
    {/if}
</div>

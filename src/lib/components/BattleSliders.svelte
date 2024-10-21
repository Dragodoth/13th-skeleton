<script>
import {RangeSlider} from "@skeletonlabs/skeleton";
import { playerNumber, partyLevel, battles } from "$lib/stores.js"
</script>

<div class="ranges-container m-4 flex grid lg:grid-cols-3 flex-row gap-4">
    <RangeSlider name="range-slider-playerNumber" bind:value={$playerNumber} min={1} max={7} step={1} ticked>
        <div class="flex items-center gap-2">
            <div class="font-bold">Number of players:</div>
            <div class="text-s">{$playerNumber}</div>
        </div>
    </RangeSlider>
    <RangeSlider name="range-slider-partyLevel" bind:value={$partyLevel} min={1} max={10} step={1} ticked>
        <div class="flex items-center gap-2">
            <div class="font-bold">Party Level:</div>
            <div class="text-s">{$partyLevel}</div>
        </div>
    </RangeSlider>
    <RangeSlider name="range-slider-battles" bind:value={$battles} min={3} max={4} step={1} ticked>
        <div class="flex items-center gap-2">
            <div class="font-bold">Number of battles before Full Heal-up:</div>
            <div class="text-s">{$battles}</div>
        </div>
    </RangeSlider>
</div>
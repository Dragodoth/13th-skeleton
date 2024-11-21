<script lang="ts">
    import InvertedColorImage from "$lib/components/utils/InvertedColorImage.svelte";

    const cardCSS = "card flex flex-col items-center variant-ghost-surface";
    const headerCSS = "card-header h1 uppercase p-4 text-center";
    const contentCSS = "p-4 text-center";
    const imgCSS = "max-w-64 w-full";
</script>

<div
    class="card grid grid-cols-2 gap-4 p-4 m-4 variant-soft h-full items-center">
    <a href="/about">
        <div class={cardCSS}>
            <header class={headerCSS}>About</header>
            <InvertedColorImage
                src="/DeanSpencer-filler-scroll.png"
                alt="Scroll"
                {imgCSS} />
            <section class={contentCSS}>
                General and legal information about this app
            </section>
        </div>
    </a>

    <a class="card" href="/compendium">
        <div class={cardCSS}>
            <header class={headerCSS}>SRD Compendium</header>
            <InvertedColorImage
                src="/DeanSpencer-filler-magicbook.png"
                alt="Magic Book"
                {imgCSS} />
            <section class={contentCSS}>13th Age SRD rules</section>
        </div>
    </a>

    <a class="card" href="/builder">
        <div class={cardCSS}>
            <header class={headerCSS}>Battle Builder</header>
            <InvertedColorImage
                src="/DeanSpencer-filler-weaponrack.png"
                alt="Weapon rack"
                {imgCSS} />
            <section class={contentCSS}>
                Tool for building battles with automatic calculations
            </section>
        </div>
    </a>

    <a class="card" href="/manager">
        <div class={cardCSS}>
            <header class={headerCSS}>Battle Manager</header>
            <InvertedColorImage
                src="/DeanSpencer-filler-skeletonknight.png"
                alt="Skeleton Knight"
                {imgCSS} />
            <section class={contentCSS}>
                Statblock and HP management for battles
            </section>
        </div>
    </a>
</div>

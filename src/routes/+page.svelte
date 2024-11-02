<script lang="ts">
    const cardCSS = "card"
    const headerCSS = "card-header h1 uppercase p-4 text-center";
    const contentCSS = "p-4 text-center";
</script>
<div class="card grid grid-cols-2 gap-4 p-4 m-4 variant-soft h-full items-center">
    <a href="/about">
        <div class={cardCSS}>
            <header class={headerCSS}>About</header>
            <section class={contentCSS}>General and legal information about this app</section>
        </div>
    </a>
    <a class="card" href="/compendium">
        <div class={cardCSS}>
            <header class={headerCSS}>SRD Compendium</header>
            <section class={contentCSS}>13th Age SRD rules</section>
        </div>
    </a>
    <a class="card" href="/builder">
        <div class={cardCSS}>
            <header class={headerCSS}>Battle Builder</header>
            <section class={contentCSS}>Tool for building battles with automatic calculations</section>
        </div>
    </a>
    <a class="card" href="/manager">
        <div class={cardCSS}>
            <header class={headerCSS}>Battle Manager</header>
            <section class={contentCSS}>Statblock and HP management for battles</section>
        </div>
    </a>
</div>

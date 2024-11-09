<script lang="ts">

    interface Props {
        src: string;
        alt: string;
        imgCSS: string;
    }

    const {
        src,
        alt,
        imgCSS
    }: Props = $props();

</script>

<img {src} {alt} class={imgCSS}/>

<style>
    img {
        filter: url(#filter);
    }
</style>

<svg xmlns="http://www.w3.org/2000/svg" style="display: none">
    <filter id="filter" color-interpolation-filters="sRGB">
        <feColorMatrix
                type="matrix"
                values="-1.000  0.000  0.000  1.000  0.000
               0.000 -1.000  0.000  1.000  0.000
               0.000  0.000 -1.000  1.000  0.000
               0.000  0.000  0.000  1.000  0.000">
        </feColorMatrix>
    </filter>
</svg>
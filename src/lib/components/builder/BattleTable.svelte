<script lang="ts">
    import { battleTable } from "$lib/stores.ts";
</script>

<div class="table-container">
    <table class="table table-comfortable text-center">
        <thead class="lg:text-xl text-s uppercase">
            <tr>
                <th>Monster level</th>
                <th>Standard / 5 mooks</th>
                <th>Elite / 7-8 mooks</th>
                <th>2x / large / 10 mooks</th>
                <th>3x / huge / 15 mook</th>
            </tr>
        </thead>
        <tbody>
            {#each $battleTable as row}
                <tr>
                    <td><span class="text-xl font-bold">{row.level}</span></td>
                    <td>{row.normal.value}{row.normal.asterisk}</td>
                    <td>{row.elite.value}{row.elite.asterisk}</td>
                    <td>{row.large.value}{row.large.asterisk}</td>
                    <td>{row.huge.value}{row.huge.asterisk}</td>
                </tr>
            {/each}
        </tbody>
    </table>
    <p>
        * Be careful. A monster like this might pack an uncomfortable amount of
        damage into a single swing.
    </p>
    <p>
        ** Probably a mistake to build a battle around monsters that dish out
        damage like these do.
    </p>
</div>

<script lang="ts">
	import type { AlertPhenomena } from "@prisma/client";

    export let phenomena: AlertPhenomena
</script>

<div class="mt-2">{phenomena.name} - {phenomena.Alerts.length}</div>
<div class="mr-4 border-white border shadow-md bg-red-500/50 shadow-red-600/40">
    {#each phenomena.Alerts as alert}
        <div class="">{alert.AlertPhenomena.name} {alert.AlertSignificance.name} for {#each alert.AlertHistory[0].AlertUGC as county}
            {county.CountyFIPS.name} {county.CountyFIPS.state}
        {/each}</div>
    {/each}
</div>
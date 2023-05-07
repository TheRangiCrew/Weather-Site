<script lang="ts">
	import { fly } from 'svelte/transition';
	import { DateTime } from 'luxon';
	import type { NotificationAlert } from '$lib/stores/Notifications';

	export let alert: NotificationAlert

	const getDateTime = (date: Date | string): DateTime => {
        if (typeof date === 'string') {
            return DateTime.fromISO(date)
        }
        return DateTime.fromJSDate(date)

    }
</script>

<div transition:fly={{ y: 20, duration: 200 }}>
	<h3 class="text-lg text-white w-full bg-red-800 px-4 py-2"><strong>UPDATE | </strong> {alert.AlertActions.name}</h3>
	<div class="text-black bg-white px-4 py-2">
		<div class="flex items-end space-x-2">
			<h1 class="font-bold text-2xl">{alert.AlertPhenomena.name}</h1><p> until {getDateTime(alert.end != null ? alert.end : new Date()).toLocaleString({hour: '2-digit', minute: '2-digit', hour12: false})}</p>
		</div>
		<p>
			{#each alert.AlertHistory[0].AlertUGC as county, i}
							{county.CountyFIPS.name} {county.CountyFIPS.state}{#if i < alert.AlertHistory[0].AlertUGC.length - 1}{", "}{/if}
						{/each}
		</p>
	</div>
</div>

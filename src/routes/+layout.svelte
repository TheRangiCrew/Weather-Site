<script lang="ts">
	import Toast from "$lib/components/Toast.svelte";
	import { createNotification, notifications, type NotificationAlert } from "$lib/stores/Notifications";
	import "../app.css";
	import { alerts, setAlerts } from "$lib/stores/Alerts";
	import type { LayoutServerData } from "./$types";
	import { onDestroy, onMount } from "svelte";
	import { invalidate } from "$app/navigation";
	import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
	import type { Alerts } from "@prisma/client";
	import supabase from "$lib/supabase";
	import { clock } from "$lib/stores/Clock";
	import { Icon } from "svelte-awesome";
	import { faMap, faTriangleExclamation } from "@fortawesome/pro-regular-svg-icons";
	import { DateTime } from "luxon";

	export let data: LayoutServerData

	let ttp: {
		data: number[],
		ttp: number
	} = {
		data: [],
		ttp: 0
	}

	setAlerts(data.phenomena)

	onMount(() => {
		const channel = supabase
	  		.channel('any')
	  		.on('postgres_changes', { event: '*', schema: 'public', table: 'Alerts' }, async (payload: RealtimePostgresChangesPayload<Alerts>) => {
	    		if (Object.keys(payload).length != 0) {
				console.log("Change received!", payload.eventType)
	        	invalidate("/api/AlertData").then(() => {
					setAlerts(data.phenomena)
					const index = data.phenomena.findIndex(e => e.code === payload.new.vtecPhenomena)
					const alert = data.phenomena[index].Alerts.find(e => e.id === payload.new.id);
					if (alert != undefined) {
						createNotification(alert as NotificationAlert)
						ttp.data.push(DateTime.now().diff(DateTime.fromISO(alert.AlertHistory[0].issued)).as('seconds'))
						let sum = 0;
						ttp.data.forEach(e => sum += e);
						ttp.ttp = sum/ttp.data.length;
						console.log(ttp)
					}
				})
	    	}
		})
		.subscribe()
	})

	const killSubscriptions = {
		alerts: alerts.subscribe(() => {}),
		clock: clock.subscribe(() => {})
	}

	onDestroy(() => {
		killSubscriptions.alerts()
		killSubscriptions.clock()
	});
</script>

<div class="w-screen h-full min-h-screen bg-neutral-900 text-white">
	<nav class="w-full px-2 py-1 shadow-lg border-b border-neutral-950 flex justify-between items-center">
		<div class="flex items-center space-x-4">
			<h1 class="text-xl font-semibold">Weather Project v1</h1>
			<span>{$clock.toLocaleString({month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false})}</span>
		</div>
		<div class="flex justify-end items-center space-x-4">
			<ul class="space-x-4 flex items-center">
				<li>TTP: {ttp.ttp}s</li>
				<li>
					<a href="/MapBox"><Icon data={faMap} class="mr-1" />Map</a>
				</li>
			</ul>
			{#if $alerts.count > 0}
				<a class="rounded-sm bg-red-800 shadow px-2 py-1 text-sm space-x-1 flex items-center align-middle font-bold" href="/">
					<Icon data={faTriangleExclamation} scale={1.2} /><div>{$alerts.count} {$alerts.count === 1 ? "alert" : "alerts"}</div>
				</a>
			{/if}
		</div>
	</nav>
	<div>
		<slot />
	</div>
</div>

{#if notifications}
	<div class="absolute left-20 bottom-10 shadow space-y-4">
		{#each $notifications as notification}
			<Toast alert={notification} />
		{/each}
	</div>
{/if}

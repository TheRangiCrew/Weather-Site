<script lang="ts">
	import Toast from "$lib/components/Toast.svelte";
	import { createNotification, notifications, type NotificationAlert } from "$lib/stores/Notifications";
	import "../app.css";
	import { alerts } from "$lib/stores/AlertData";
	import type { LayoutServerData } from "./$types";
	import { onDestroy, onMount } from "svelte";
	import { invalidate } from "$app/navigation";
	import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
	import type { Alerts } from "@prisma/client";
	import supabase from "$lib/supabase";

	export let data: LayoutServerData

	alerts.set(data.phenomena);

	onMount(() => {
		const channel = supabase
	  		.channel('any')
	  		.on('postgres_changes', { event: '*', schema: 'public', table: 'Alerts' }, async (payload: RealtimePostgresChangesPayload<Alerts>) => {
	    		if (Object.keys(payload).length != 0) {
				console.log("Change received!", payload.eventType)
	        	invalidate("/api/AlertData").then(() => {
					alerts.set(data.phenomena);
					const index = data.phenomena.findIndex(e => e.code === payload.new.vtecPhenomena)
					const alert = data.phenomena[index].Alerts.find(e => e.id === payload.new.id);
					createNotification(alert as NotificationAlert)
				})
	    	}
		})
		.subscribe()
	})

	const unsubscribe = alerts.subscribe((e) => {

	})

	onDestroy(unsubscribe);
</script>

<div class="w-screen h-full min-h-screen bg-neutral-900 text-white">
	<slot />
</div>

{#if notifications}
<div class="absolute left-20 bottom-10 shadow space-y-4">
	{#each $notifications as notification}
		<Toast alert={notification} />
	{/each}
</div>
{/if}

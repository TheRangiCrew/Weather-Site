<script lang="ts">
	import type { Notification } from '$lib/stores/Notifications';

	export let notification: Notification;
</script>

{#if notification.type === 0}
	<div
		class="text-sm px-2 py-1 border border-gray-200 text-white bg-gradient-to-r from-gray-700 to-gray-400 rounded-t"
	>
		{notification.title}
	</div>
{:else if notification.type === 1}
	<div
		class="text-sm px-2 py-1 border border-gray-200 text-white bg-gradient-to-r from-emerald-700 to-emerald-400 rounded-t"
	>
		{notification.title}
	</div>
{:else if notification.type === 2}
	<div
		class="text-sm px-2 py-1 border border-gray-200 text-white bg-gradient-to-r from-red-700 to-red-400 rounded-t"
	>
		{notification.title}
	</div>
{:else if notification.type === 3}
	<div
		class="text-sm px-2 py-1 border border-gray-200 text-white bg-gradient-to-r from-yellow-700 to-yellow-400 rounded-t"
	>
		{notification.title}
	</div>
{/if}

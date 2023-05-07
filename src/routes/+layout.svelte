<script lang="ts">
	import Toast from "$lib/components/Toast.svelte";
	import { notifications } from "$lib/stores/Notifications";
	
	import "../app.css";
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

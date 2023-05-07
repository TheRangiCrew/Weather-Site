<script lang="ts">
	import type { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
	import { Icon } from "svelte-awesome";

    export let icon: IconDefinition
    export let data: string | number | null | undefined
</script>

<div class="flex items-center justify-center space-x-2 flex-1" class:text-neutral-600={data === null}>
    <Icon data={icon} />
    <div class="text-sm">{data != null ? data : ""}</div>
</div>
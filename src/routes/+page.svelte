<script lang="ts">
	import { alerts } from "$lib/stores/Alerts";
	import { onDestroy } from "svelte";
    import {DateTime} from 'luxon'
    import Icon from 'svelte-awesome'
    import {faCloudHail, faFileLines, faHouseChimneyCrack, faTornado, faWind, faXmark} from '@fortawesome/pro-regular-svg-icons'
	import WarningStats from "$lib/components/WarningStats.svelte";
	import { clock } from "$lib/stores/Clock";

    const getDateTime = (date: Date | string | null): DateTime => {
        if (typeof date === 'string') {
            return DateTime.fromISO(date)
        }
        return DateTime.fromJSDate(date != null ? date : new Date());

    }

    const unsubscribe = alerts.subscribe(() => {})

    let textModal = {
        show: false,
        text: ""
    }

    onDestroy(unsubscribe)
</script>

<div class="w-full h-full flex justify-center items-center">
    <div class="w-full lg:w-3/4">
        <div>
            {#each $alerts.data as phenomena}
            {#if phenomena.Alerts.length > 0}
                <div class="mt-2">{phenomena.name} - {phenomena.Alerts.length}</div>
                <div class="mr-4 shadow-md">
                    {#each phenomena.Alerts as alert}
                        {#if alert.AlertHistory.length > 0}
                        <div class="">
                            <div class="bg-red-800 w-full flex items-center px-2 py-1">
                                <div class="w-11/12">
                                    {#each alert.AlertHistory[0].AlertUGC as county, i}
                                        {county.CountyFIPS.name} {county.CountyFIPS.state}{#if i < alert.AlertHistory[0].AlertUGC.length - 1}{", "}{/if}
                                    {/each} until {getDateTime(alert.end).toLocaleString({hour: '2-digit', minute: '2-digit', hour12: false})} - {Math.floor(getDateTime(alert.end).diff($clock).as('minutes')) + (Math.floor(getDateTime(alert.end).diff($clock).as('minutes')) === 1 ? " min" : " mins")}
                                </div>
                                <div class="w-1/12 text-end">
                                    <button on:click={() => {
                                        textModal = {show: true, text: alert.AlertHistory[0].text}
                                        }}><Icon data={faFileLines}/></button>
                                </div>
                            </div>
                            <div class="bg-neutral-800 px-2 py-3 flex items-center justify-around">
                                <WarningStats icon={faCloudHail} data={alert.AlertHistory[0].hailMaxTag} />
                                <WarningStats icon={faWind} data={alert.AlertHistory[0].windMaxTag} />
                                <WarningStats icon={faHouseChimneyCrack} data={alert.AlertHistory[0].thunderstormThreatTag} />
                                <WarningStats icon={faTornado} data={alert.AlertHistory[0].tornadoTag} />
                            </div>
                        </div>
                        {/if}
                    {/each}
                </div>
                {/if}
            {/each}
        </div>
    </div>
</div>

{#if textModal.show}
    <div class="absolute h-screen w-screen bg-neutral-900/30 flex justify-center items-center top-0 left-0 z-50">
        <div class="bg-black h-3/4 w-full md:w-3/4 lg:w-1/2 p-2 rounded whitespace-pre-line text-sm overflow-scroll leading-3">
            <div class="sticky top-0 text-end"><button class="bg-neutral-800 rounded p-1" on:click={() => {textModal.show = false}}><Icon data={faXmark} /></button></div>
            <p>{@html textModal.text}</p>
        </div>
    </div>
{/if}
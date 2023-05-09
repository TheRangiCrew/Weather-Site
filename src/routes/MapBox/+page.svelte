<script lang="ts">
	import { alerts } from '$lib/stores/Alerts';
    import mapboxgl, { Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
	import { onDestroy, onMount } from 'svelte';
	import type { AlertDataDB } from '../api/AlertData/getPhenomena';
	import type { Prisma } from '@prisma/client';
	import { element } from 'svelte/internal';
	import { Icon } from 'svelte-awesome';
	import { faLocationCrosshairs } from '@fortawesome/pro-regular-svg-icons';

    let map: Map
    let mapContainer: HTMLElement;

    let geojson = {
        'type': 'FeatureCollection',
        'features': new Array
    }

    const updateData = () => {
        geojson.features = [];

        $alerts.data.forEach((phenomena) => {
            phenomena.Alerts.forEach((alert) => {
                const current = alert.AlertHistory[0]
                    const geometry: number[][] = typeof current.geometry === 'string' ? JSON.parse(current.geometry) : current.geometry;
                    geometry.push(geometry[0])
                    geojson.features.push({
                        'type': 'Feature',
                        'properties': {
                            'phenomena': current.vtecPhenomena
                        },
                        'geometry': {
                            'type': 'Polygon',
                            'coordinates': [
                                geometry.map((coordinate: number[]) => {
								    if (coordinate[1] > 0) {
								    	coordinate[1] = 0 - coordinate[1]
								    }
								    return [coordinate[1], coordinate[0]];
							    })
                            ]
                        }
                    })
            })
        })
        
        map.getSource('warnings').setData(geojson);
    }

    onMount(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoidGhlcmFuZ2ljcmV3IiwiYSI6ImNreThhamRtaTE5ZWEycXBsc3NraTJhaXgifQ._uLbksdf1f7TVXKR4hiJXw';
    
        map = new mapboxgl.Map({
            container: mapContainer, // container ID
            style: 'mapbox://styles/therangicrew/clge6tpkw000001p7tjedk875', // style URL
            center: [-90, 38], // starting position [lng, lat]
            zoom: 4, // starting zoom
            projection: {name: 'mercator'}
        });
        
        map.on('load', () => {

            map.addSource('warnings', { 
                'type': 'geojson',
                'data': geojson
            })

            updateData()

             
            map.addLayer({
                'id': 'FF',
                'type': 'line',
                'source': 'warnings',
                'layout': {},
                'paint': {
                    'line-color': '#3deb34',
                    'line-width': 2,
                },
                'filter': ['in', 'phenomena', 'FF']
            });

            map.addLayer({
                'id': 'MA',
                'type': 'line',
                'source': 'warnings',
                'layout': {},
                'paint': {
                    'line-color': '#f26c05',
                    'line-width': 2
                },
                'filter': ['in', 'phenomena', 'MA']
            });

            map.addLayer({
                'id': 'SV',
                'type': 'line',
                'source': 'warnings',
                'layout': {},
                'paint': {
                    'line-color': '#fffb00',
                    'line-width': 2
                },
                'filter': ['in', 'phenomena', 'SV']
            });

            map.addLayer({
                'id': 'TOW',
                'type': 'line',
                'source': 'warnings',
                'layout': {},
                'paint': {
                    'line-color': '#ff0000',
                    'line-width': 2
                },
                'filter': ['in', 'phenomena', 'TO']
            });

        })
    })

    const getCoords = (data: number[][]): [number, number] => {
        let g1 = 0;
        let g2 = 0;

        data.forEach((element) => {
            if (element[1] > 0) {
                element[1] = 0 - element[1]
            }
            g2 += element[0]
            g1 += element[1]
        })

        return [(g1/data.length), (g2/data.length)]
    }

    const unsubscribe = alerts.subscribe((e) => {
        if (map != undefined) {
            updateData()
        }
    });

    onDestroy(unsubscribe);
</script>

<div class="relative">
    <div class="absolute top-4 mx-4 text-white bg-neutral-900 rounded w-5/6 md:w-1/6">
        <div class="w-full border-b border-neutral-700 px-2 py-2 text-lg">
            {$alerts.count} {$alerts.count === 1 ? "alert" : "alerts"}
        </div>
        <div class="max-h-52 overflow-scroll">
            {#each $alerts.data as phenomena}
                {#if phenomena.Alerts.length > 0}
                    <div class="text-white bg-red-800 px-2">{phenomena.name}</div>
                    {#each phenomena.Alerts as alert}
                        <div class="bg-neutral-800 border-b border-neutral-700">
                            <div class="flex justify-center items-center">
                                <div></div>
                                <div>
                                    <button class="p-2" on:click={() => {
                                        map.easeTo({
                                        center: getCoords(typeof alert.AlertHistory[0].geometry === 'string' ? JSON.parse(alert.AlertHistory[0].geometry) : alert.AlertHistory[0].geometry),
                                        zoom: 8
                                    })
                                    }}><Icon data={faLocationCrosshairs} /></button>
                                </div>
                            </div>
                            <div class="flex flex-wrap justify-start space-x-2 px-2">
                                {#each alert.AlertHistory[0].AlertUGC as county}
                                    <div class="bg-blue-700 font-semibold text-sm whitespace-nowrap px-1 mb-1 rounded">{county.CountyFIPS.name}, {county.CountyFIPS.StateFIPS_CountyFIPS_stateToStateFIPS.abbreviation}</div>
                                {/each}
                            </div>
                        </div>
                    {/each}
                {/if}
            {/each}
        </div>
    </div>
    <div class="view" bind:this={mapContainer} />
</div>

<style>
	.view {
        width: 100vw;
		height: 90vh;
	}
</style>
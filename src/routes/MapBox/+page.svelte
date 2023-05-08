<script lang="ts">
	import { alerts } from '$lib/stores/AlertData';
    import mapboxgl, { Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
	import { onDestroy, onMount } from 'svelte';
	import type { AlertDataDB } from '../api/AlertData/getPhenomena';

    let map: Map
    let mapContainer: HTMLElement;

    let data: AlertDataDB = $alerts;

    let geojson = {
        'type': 'FeatureCollection',
        'features': new Array
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

            $alerts.forEach((phenomena) => {
                phenomena.Alerts.forEach((alert) => {
                    alert.AlertHistory.forEach((historical) => {
                        const geometry: number[][] = typeof historical.geometry === 'string' ? JSON.parse(historical.geometry) : historical.geometry;

                        geometry.push(geometry[0])

                        geojson.features.push({
                            'type': 'Feature',
                            'properties': {
                                'phenomena': historical.vtecPhenomena
                            },
                            'geometry': {
                                'type': 'Polygon',
                                'coordinates': [
                                    geometry.map((coordinate: number[]) => {
							    		coordinate[1] = 0 - coordinate[1]
							    		return coordinate.reverse();
							    	})
                                ]
                            }
                        })
                    })
                })
            })

            map.addSource('warnings', {
                'type': 'geojson',
                'data': geojson
            })
             
            map.addLayer({
                'id': 'FF',
                'type': 'line',
                'source': 'warnings',
                'layout': {},
                'paint': {
                    'line-color': '#3deb34',
                    'line-width': 2
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

    // const unsubscribe = alerts.subscribe((e) => {
    //     if (map != undefined) {
    //         geojson.features = [];

    //         console.log("Hello")

    //         $alerts.forEach((phenomena) => {
    //             phenomena.Alerts.forEach((alert) => {
    //                 alert.AlertHistory.forEach((historical) => {
    //                     const geometry = typeof historical.geometry === 'string' ? JSON.parse(historical.geometry) : historical.geometry;

    //                     geojson.features.push({
    //                         'type': 'Feature',
    //                         'properties': {
    //                             'phenomena': historical.vtecPhenomena
    //                         },
    //                         'geometry': {
    //                             'type': 'Polygon',
    //                             'coordinates': geometry.map((coordinate: [number, number]) => {
	// 								coordinate[1] = 0 - coordinate[1]
	// 								return coordinate.reverse();
	// 							})
    //                         }
    //                     })
    //                 })
    //             })
    //         })
    //     }
    // });

    // onDestroy(unsubscribe);
</script>

<div class="view" bind:this={mapContainer} />

<style>
	.view {
        width: 100vw;
		height: 90vh;
	}
</style>
<script lang="ts">
	import {alerts} from '$lib/stores/AlertData';
	import { onDestroy, onMount } from 'svelte';
	import 'ol/ol.css';
	import Map from 'ol/Map';
	import View from 'ol/View';
	import { fromLonLat } from 'ol/proj';
	import { apply } from 'ol-mapbox-style';
	import Polygon from 'ol/geom/Polygon';
	import Feature from 'ol/Feature';
	import VectorLayer from 'ol/layer/Vector';
	import VectorSource from 'ol/source/Vector';
	import getStyle from '$lib/scripts/PolygonStyles';
	import type { AlertDataDB } from '../api/AlertData/getPhenomena';

	let data: AlertDataDB = $alerts;

	let map: Map;
	let mapContainer: HTMLElement;
	let polygonLayer: VectorLayer<VectorSource> | null = null;

	const updateMap = () => {
		if (map != undefined) {
			if (polygonLayer != null) {
				map.removeLayer(polygonLayer);
			}
			const source = new VectorSource();

			data.forEach((phenomena) => {
				phenomena.Alerts.forEach((alert) => {
					alert.AlertHistory.forEach((feature) => {

						const geometry =
							typeof feature.geometry === 'string' ? JSON.parse(feature.geometry) : feature.geometry;
		
						const polygonFeature = new Feature({
							geometry: new Polygon([
								geometry.map((coordinate: [number, number]) => {
									coordinate[1] = 0 - coordinate[1]
									return fromLonLat(coordinate.reverse());
								})
							]),
						});
		
						polygonFeature.setId(alert.id)
		
						polygonFeature.setStyle(getStyle(feature.vtecPhenomena))
		
						source.addFeature(polygonFeature);
					})	
				});
			})
			
			polygonLayer = new VectorLayer({ source, zIndex: 100 });
			map.addLayer(polygonLayer);
		}
	};

	const unsubscribe = alerts.subscribe((e) => {
		data = e;
		updateMap();
	});

	onMount(async () => {
		const styleUrl =
			'https://api.maptiler.com/maps/5547cbdb-6c46-4af2-b0ac-55262567b3ac/style.json?key=biJLOGMnta8MVPFAd2db';

		map = new Map({
			target: mapContainer,
			view: new View({
				center: fromLonLat([-95, 38]),
				zoom: 5
			})
		});

		await apply(map, styleUrl);

		map.on('click', (event) => {
			const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => {return feature});
		});

		updateMap();
	});

	onDestroy(unsubscribe);
</script>

<div id="map" bind:this={mapContainer} />

<style>
	#map {
		width: 100%;
		height: 90vh;
	}
</style>

# Weather Alert Site
A web application that displays current, real time warnings from the National Weather Service in the US. Displays warning data in a table or map.

This is the client site that displays the data collected by the [NWWS Server](https://github.com/TheRangiCrew/NWWS-Server). All data is stored in a [Supabase](https://github.com/supabase/supabase) project and is displayed in real-time.

The site uses [SvelteKit](https://github.com/sveltejs/kit) with TypeScript to server render client components. Styling is created using [TailwindCSS](https://github.com/tailwindlabs/tailwindcss).

## Current Project State and Plans

The following features are available:
 - [x] Realtime warning data from Supabase
 - [x] Raw warnings available in a table of warnings including their expiration times
 - [x] Warnings represented as polygons are displayed on a map using [MapBox](https://github.com/mapbox/mapbox-gl-js)

Future features:
 - [ ] SPC Outlooks and Mesoscale Discussions
 - [ ] Live Storm Reports
 - [ ] Level II & Level III US Radar data - seperate project in Rust
 - [ ] Past warnings and events/reports

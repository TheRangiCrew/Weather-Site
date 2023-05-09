import { DateTime } from "luxon";
import { writable, type Writable } from "svelte/store";

export const clock: Writable<DateTime> = writable(DateTime.now())

setInterval(() => {
    clock.update(() => DateTime.now())
}, 1000)
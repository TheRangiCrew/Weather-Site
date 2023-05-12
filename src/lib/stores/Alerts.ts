import { writable, type Writable } from "svelte/store";
import type { AlertDataDB } from "../../routes/api/AlertData/getPhenomena";

export type AlertData = {
    data: AlertDataDB,
    count: number,
}

export const alerts: Writable<AlertData> = writable({
    data: [],
    count: 0
});

export const setAlerts = (data: AlertDataDB) => {
    let count = 0

    data.forEach(e => {
        count += e.Alerts.length;
    })

    alerts.set({
        data,
        count,
    })
}
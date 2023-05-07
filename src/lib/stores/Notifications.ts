import type { AlertActions, AlertHistory, AlertPhenomena, AlertUGC, Alerts, CountyFIPS, StateFIPS } from '@prisma/client';
import { writable, type Writable } from 'svelte/store';

export type NotificationAlert = (Alerts & {
    AlertActions: AlertActions,
    AlertPhenomena: AlertPhenomena,
    AlertHistory: (AlertHistory & {
        AlertUGC: (AlertUGC & {
            CountyFIPS: (CountyFIPS & {
                StateFIPS_CountyFIPS_stateToStateFIPS: StateFIPS
            });
        })[];
    })[];
})

export const notifications = writable<NotificationAlert[]>([])

export const createNotification = (alert: NotificationAlert) => {
    notifications.update((state) => [alert, ...state]);
    setTimeout(removeNotification, 10 * 1000)
}
export const removeNotification = () => {
    notifications.update((state) => {
        return [...state.slice(0, state.length - 1)];
    })
}
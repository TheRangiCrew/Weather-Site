import supabase from "$lib/supabaseConfig";
import type { Alerts } from "@prisma/client";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { writable, type Writable } from "svelte/store";
import type { AlertDataDB } from "../../routes/api/AlertData/getPhenomena";
import { type NotificationAlert, createNotification } from "./Notifications";

export const alerts: Writable<AlertDataDB> = writable(await (await fetch('http://localhost:5173/api/AlertData')).json())

const channel = supabase
  .channel('any')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'Alerts' }, async (payload: RealtimePostgresChangesPayload<Alerts>) => {
    console.log('Change received!', payload)
    if (Object.keys(payload).length != 0) {
        const data: AlertDataDB = await (await fetch('http://localhost:5173/api/AlertData')).json()
        const index = data.findIndex(e => e.code === payload.new.vtecPhenomena)
        const alert = data[index].Alerts.find(e => e.id === payload.new.id);
        console.log(alert)
        createNotification(alert as NotificationAlert)
        alerts.set(data)
    }
  })
  .subscribe()



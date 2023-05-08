import { writable, type Writable } from "svelte/store";
import type { AlertDataDB } from "../../routes/api/AlertData/getPhenomena";


export const alerts: Writable<AlertDataDB> = writable([])



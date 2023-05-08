import type { LayoutServerLoad } from "./$types";
import type { AlertDataDB } from "./api/AlertData/getPhenomena";


export const load: LayoutServerLoad = async ({fetch, depends}) => {
    const response: Promise<AlertDataDB> = (await fetch("/api/AlertData")).json()

    return { phenomena: response}
}
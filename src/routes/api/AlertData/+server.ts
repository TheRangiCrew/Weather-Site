import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getPhenomenaData } from "./getPhenomena";

export const GET: RequestHandler = async () => {
    return json(await getPhenomenaData())
}
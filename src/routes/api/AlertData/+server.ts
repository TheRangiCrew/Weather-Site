import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import prisma from "$lib/prisma";
import { getPhenomenaData } from "./getPhenomena";

export const GET: RequestHandler = async () => {

    return json(await getPhenomenaData())
}
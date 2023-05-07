import type { PageServerLoad } from "./$types";
import { getPhenomenaData } from "./api/AlertData/getPhenomena";

export const load: PageServerLoad = async () => {
    
    const phenomena = await getPhenomenaData()

    return {phenomena}
};
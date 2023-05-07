import prisma from "$lib/prisma";
import type { AlertHistory } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const alertData = await prisma.alerts.findMany({
        include: {
            AlertHistory: {
                take: 1,
                orderBy: {
                    created_at: 'desc'
                }
            }
        },
        where: {
            AlertHistory: {
                every: {
                    expires: {
                        gte: new Date()
                    }
                }
            }
        },
    })

    const alerts: AlertHistory[] = alertData.map((element) => {
        return element.AlertHistory[0]
    })

    return {alerts}
};
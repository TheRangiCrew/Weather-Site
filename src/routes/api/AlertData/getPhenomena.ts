import prisma from "$lib/prisma";
import type { AlertActions, AlertClass, AlertHistory, AlertPhenomena, AlertSignificance, AlertUGC, Alerts, CountyFIPS, StateFIPS, WFOData } from "@prisma/client";

export type AlertDataDB = (AlertPhenomena & {
    Alerts: (Alerts & {
        WFOData: WFOData;
        AlertActions: AlertActions;
        AlertClass: AlertClass;
        AlertPhenomena: AlertPhenomena;
        AlertSignificance: AlertSignificance;
        AlertHistory: (AlertHistory & {
            AlertActions: AlertActions,
            AlertClass: AlertClass,
            AlertPhenomena: AlertPhenomena,
            AlertUGC: (AlertUGC & {
                CountyFIPS: (CountyFIPS & {
                    StateFIPS_CountyFIPS_stateToStateFIPS: StateFIPS
                });
            })[];
        })[];
    })[];
})[];

export const getPhenomenaData = async () => {
    const date = new Date();

    return await prisma.alertPhenomena.findMany({
        include: {
            Alerts: {
                include: {
                    AlertHistory: {
                        include: {
                            AlertActions: true,
                            AlertClass: true,
                            AlertPhenomena: true,
                            AlertSignificance: true,
                            AlertUGC: {
                                include: {
                                    CountyFIPS: {
                                        include: {
                                            StateFIPS_CountyFIPS_stateToStateFIPS: true
                                        }
                                    }
                                }
                            }
                        },
                        orderBy: {
                            created_at: 'desc'
                        }
                    },
                    WFOData: true,
                    AlertActions: true,
                    AlertClass: true,
                    AlertPhenomena: true,
                    AlertSignificance: true,
                },
                orderBy: {
                    created_at: 'desc'
                },
                where: {
                    end: {
                        gte: new Date()
                    },
                }
            },
        }
    })
}
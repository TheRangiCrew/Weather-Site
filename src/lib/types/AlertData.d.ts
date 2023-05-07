type Coordinate = Array<number>

interface Geometry {
    type: string,
    coordinates: Array<Array<Coordinate>>
}

interface Parameters {
    VTEC: VTEC
}

interface Properties {
    id: string | URL,
    "@type": string,
    areaDesc: string,
    sent: Date,
    effective: Date,
    onset: Date,
    expires: Date,
    ends: Date,
    status: string,
    messageType: string,
    category: string,
    severity: string,
    certainty: string,
    urgency: string,
    event: string,
    senderName: string,
    headline: string,
    description: string,
    instruction: string,
    response: string,
    parameters: parameters
}

interface Feature {
    "@id": string | URL,
    type: "Feature",
    geometry: Geometry | null,
    properties: Properties
}

interface AlertData {
    features: Feature[],
    updated: string | Date
}
const decode = (data: AlertData): AlertData => {
    return {
        features: data.features.filter(feature => feature.geometry != null).map((feature): Feature => {
            return {
                ...feature, geometry: feature.geometry != null ? {
                    ...feature.geometry, coordinates: feature.geometry.coordinates.map(coordinate => {
                        return coordinate.reverse()
                    })
                } : null
            }
        }), updated: data.updated
    }
}

export default decode
import * as style from 'ol/style.js'

const strokeWidth = 2

const styles = {
    TORW: new style.Style({
            stroke: new style.Stroke({
                color: 'red',
                width: strokeWidth,
            }),
            fill: new style.Fill({
                color: 'rgba(255, 0, 0, 0.01)',
            }),
        }),
    SVR: new style.Style({
        stroke: new style.Stroke({
            color: 'yellow',
            width: strokeWidth,
        }),
        fill: new style.Fill({
            color: 'rgba(255, 255, 0, 0.01)',
        }),
    }),
    MA: new style.Style({
        stroke: new style.Stroke({
            color: 'orange',
            width: strokeWidth,
        }),
        fill: new style.Fill({
            color: 'rgba(255, 127, 0, 0.01)',
        }),
    }),
    FF: new style.Style({
        stroke: new style.Stroke({
            color: 'lightgreen',
            width: strokeWidth,
        }),
        fill: new style.Fill({
            color: 'rgba(0, 255, 0, 0.01)',
        }),
    }),
}

const getStyle = (event: string) => {
    switch (event) {
        case "SV": 
            return styles.SVR;
            break;
        case "TO":
            return styles.TORW;
            break;
        case "MA":
            return styles.MA;
            case "FF":
                return styles.FF;
    }
}

export default getStyle
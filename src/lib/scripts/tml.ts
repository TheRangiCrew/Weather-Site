export interface TML {
    time: {hour: number, minute: number},
    trajectory: number,
    speed: number,
    location: number[]
}

export const tml = {
    parse: (text: string): TML | null => {
        let data = text.split(' ');
        data.shift()
        let time = data[0].split('')
        time.pop()

        return {
            time: {hour: Number(data[0].slice(0,2)), minute: Number(data[0].slice(2, 4))},
            trajectory: Number(data[1].slice(0,3)),
            speed: Number(data[2].slice(0,2)),
            location: [Number(data[3])/100, Number(data[4])/100]
        }
    }
}
import fs from 'fs';

const input = fs.readFileSync('15/input.txt', 'utf8').split('\n').filter(Boolean);

const part1 = (() => {
    const testLine = 2000000;

    const beaconLessXCoordinates = new Set<number>();

    const getManhattanDistance = (x1: number, y1: number, x2: number, y2: number) =>
        Math.abs(x1 - x2) + Math.abs(y1 - y2);

    for (const line of input) {
        const [[xs], [ys], [xb], [yb]] = line.matchAll(/-?\d+/g);

        const beaconDistance = getManhattanDistance(Number(xs), Number(ys), Number(xb), Number(yb));

        if (Math.abs(Number(ys) - testLine) > beaconDistance) {
            continue;
        }

        const xDistance = beaconDistance - Math.abs(testLine - Number(ys));

        for (let x = Number(xs) - xDistance; x <= Number(xs) + xDistance; x++) {
            if (Number(yb) === testLine && x === Number(xb)) {
                continue;
            }

            beaconLessXCoordinates.add(x);
        }
    }

    return beaconLessXCoordinates.size;
})();

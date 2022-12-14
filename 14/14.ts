import fs from 'fs';

const paths = fs.readFileSync('14/input.txt', 'utf8').split('\n').filter(Boolean);

const part1 = (() => {
    enum CellMaterial {
        Rock,
        Sand
    }

    const map = new Map<string, CellMaterial>();
    let maxY = 0;

    for (const path of paths) {
        const endpoints = path.split(' -> ');

        for (let i = 1; i < endpoints.length; i++) {
            const [x1, y1] = endpoints[i - 1].split(',').map(Number);
            const [x2, y2] = endpoints[i].split(',').map(Number);

            for (
                let x = x1, y = y1;
                (x1 !== x2 && x >= Math.min(x1, x2) && x <= Math.max(x1, x2)) ||
                (y1 !== y2 && y >= Math.min(y1, y2) && y <= Math.max(y1, y2));
                x += Math.sign(x2 - x1), y += Math.sign(y2 - y1)
            ) {
                map.set(`${x},${y}`, CellMaterial.Rock);
                maxY = Math.max(maxY, y);
            }
        }
    }

    let isFlowingIntoAbyss = false;
    let unitsAtRest = 0;

    abyssCheck: while (!isFlowingIntoAbyss) {
        const sandPosition = [500, 0];
        let isAtRest = false;

        while (!isAtRest) {
            if (sandPosition[1] >= maxY) {
                isFlowingIntoAbyss = true;
                continue abyssCheck;
            }

            if (map.get(`${sandPosition[0]},${sandPosition[1] + 1}`) === undefined) {
                sandPosition[1]++;
                continue;
            }

            if (map.get(`${sandPosition[0] - 1},${sandPosition[1] + 1}`) === undefined) {
                sandPosition[0]--;
                sandPosition[1]++;
                continue;
            }

            if (map.get(`${sandPosition[0] + 1},${sandPosition[1] + 1}`) === undefined) {
                sandPosition[0]++;
                sandPosition[1]++;
                continue;
            }

            isAtRest = true;
        }

        map.set(`${sandPosition[0]},${sandPosition[1]}`, CellMaterial.Sand);
        unitsAtRest++;
    }

    return unitsAtRest;
})();

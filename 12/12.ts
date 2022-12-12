import fs from 'fs';

const grid = fs.readFileSync('12/input.txt', 'utf8').split('\n').filter(Boolean);

const findShortestPathDistances = (row: number, col: number) => {
    const queue = [[row, col, 0]];
    const visited = new Set([[row, col].join(',')]);

    while (queue.length) {
        const [row, col, distance] = queue.shift()!;

        if (grid[row][col] === 'E') {
            return distance;
        }

        const options = [
            [row - 1, col],
            [row, col + 1],
            [row + 1, col],
            [row, col - 1]
        ];

        for (const [nextRow, nextCol] of options) {
            if (!grid[nextRow] || !grid[nextRow][nextCol]) {
                continue;
            }

            if (visited.has([nextRow, nextCol].join(','))) {
                continue;
            }

            const currentElevation = grid[row][col];
            const nextElevation = grid[nextRow][nextCol];

            if (
                (nextElevation === 'E' ? 'z' : nextElevation).charCodeAt(0) -
                    (currentElevation === 'S' ? 'a' : currentElevation).charCodeAt(0) >
                1
            ) {
                continue;
            }

            queue.push([nextRow, nextCol, distance + 1]);
            visited.add([nextRow, nextCol].join(','));
        }
    }

    return null;
};

const part1 = (() => {
    const startRow = grid.findIndex((row) => row.includes('S'));
    const startCol = grid[startRow].indexOf('S');

    return findShortestPathDistances(startRow, startCol);
})();

type Coordinate = [number, number];

const part2 = (() => {
    let shortestDistance = Infinity;

    grid.reduce((lowPoints, row, rowIdx) => {
        row.split('').forEach((col, colIdx) => {
            if (['S', 'a'].includes(col)) {
                lowPoints.push([rowIdx, colIdx]);
            }
        });

        return lowPoints;
    }, [] as Coordinate[]).forEach((lowPoint) => {
        const distance = findShortestPathDistances(...lowPoint);

        if (distance === null) {
            return;
        }

        shortestDistance = Math.min(shortestDistance, distance);
    });

    return shortestDistance;
})();

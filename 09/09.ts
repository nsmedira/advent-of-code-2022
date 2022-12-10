import fs from 'fs';

type Coordinate = [number, number];

const moves = fs
    .readFileSync('09/input.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((move) => move.split(' '));

const getIsAdjacentKnots = (head: Coordinate, tail: Coordinate) => {
    const [headX, headY] = head;
    const [tailX, tailY] = tail;

    return (
        (headX === tailX && Math.abs(headY - tailY) === 1) ||
        (headY === tailY && Math.abs(headX - tailX) === 1) ||
        (Math.abs(headX - tailX) === 1 && Math.abs(headY - tailY) === 1) ||
        (headX === tailX && headY === tailY)
    );
};

const moveKnot = (knotToMove: Coordinate, targetKnot: Coordinate) => {
    const slope = (targetKnot[1] - knotToMove[1]) / (targetKnot[0] - knotToMove[0]);

    if (slope === Infinity) {
        knotToMove[1] += Math.sign(targetKnot[1] - knotToMove[1]);
        return;
    }

    if (slope === 0) {
        knotToMove[0] += Math.sign(targetKnot[0] - knotToMove[0]);
        return;
    }

    knotToMove[0] += Math.sign(targetKnot[0] - knotToMove[0]);
    knotToMove[1] += Math.sign(targetKnot[1] - knotToMove[1]);
};

const getTailVisitedCount = (countKnots: number) => {
    const knots = new Array(countKnots).fill(0).map((): [number, number] => [0, 0]);

    const visited = new Set().add(knots[knots.length - 1].join(','));

    for (const [direction, distance] of moves) {
        for (let i = 0; i < Number(distance); i++) {
            if (direction === 'R') {
                knots[0][0]++;
            }

            if (direction === 'L') {
                knots[0][0]--;
            }

            if (direction === 'U') {
                knots[0][1]++;
            }

            if (direction === 'D') {
                knots[0][1]--;
            }

            for (let i = 1; i < knots.length; i++) {
                const prevKnot = knots[i - 1];
                const currentKnot = knots[i];

                if (getIsAdjacentKnots(prevKnot, currentKnot)) {
                    break;
                }

                moveKnot(currentKnot, prevKnot);

                if (i !== knots.length - 1) {
                    continue;
                }

                visited.add(currentKnot.join(','));
            }
        }
    }

    return visited.size;
};

const part1 = getTailVisitedCount(2);
const part2 = getTailVisitedCount(10);

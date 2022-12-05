import fs from 'fs';

const pairs = fs
    .readFileSync('04/input.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((pair) => pair.split(',').map((range) => range.split('-').map(Number)));

const part1 = pairs.reduce((countOverlapping, pair) => {
    if (
        (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
        (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1])
    ) {
        return countOverlapping + 1;
    }

    return countOverlapping;
}, 0);

const part2 = pairs.reduce((countOverlapping, pair) => {
    for (let i = pair[0][0]; i <= pair[0][1]; i++) {
        if (i >= pair[1][0] && i <= pair[1][1]) {
            return countOverlapping + 1;
        }
    }

    return countOverlapping;
}, 0);

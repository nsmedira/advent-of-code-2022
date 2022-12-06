import fs from 'fs';

const datastream = fs.readFileSync('06/input.txt', 'utf8');

const part1 = getCharReadCount(4);
const part2 = getCharReadCount(14);

function getCharReadCount(countDistinct: number) {
    for (let i = countDistinct - 1; i < datastream.length; i++) {
        if (new Set(datastream.slice(i - (countDistinct - 1), i + 1)).size !== countDistinct) {
            continue;
        }

        return i + 1;
    }
}

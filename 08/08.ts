import fs from 'fs';

const treeRows = fs.readFileSync('08/input.txt', 'utf8').split('\n').filter(Boolean);

const part1 = (() => {
    let visibleTrees = 0;

    for (let i = 0; i < treeRows.length; i++) {
        if (i === 0 || i === treeRows.length - 1) {
            visibleTrees += treeRows[i].length;
            continue;
        }

        treeLoop: for (let j = 0; j < treeRows[i].length; j++) {
            if (j === 0 || j === treeRows[i].length - 1) {
                visibleTrees++;
                continue;
            }

            const height = Number(treeRows[i][j]);

            for (let k = j - 1; k >= 0; k--) {
                if (Number(treeRows[i][k]) >= height) {
                    break;
                }

                if (k !== 0) {
                    continue;
                }

                visibleTrees++;
                continue treeLoop;
            }

            for (let k = i - 1; k >= 0; k--) {
                if (Number(treeRows[k][j]) >= height) {
                    break;
                }

                if (k !== 0) {
                    continue;
                }

                visibleTrees++;
                continue treeLoop;
            }

            for (let k = j + 1; k <= treeRows[i].length - 1; k++) {
                if (Number(treeRows[i][k]) >= height) {
                    break;
                }

                if (k !== treeRows[i].length - 1) {
                    continue;
                }

                visibleTrees++;
                continue treeLoop;
            }

            for (let k = i + 1; k <= treeRows.length - 1; k++) {
                if (Number(treeRows[k][j]) >= height) {
                    break;
                }

                if (k !== treeRows.length - 1) {
                    continue;
                }

                visibleTrees++;
            }
        }
    }

    return visibleTrees;
})();

const part2 = (() => {
    let highestScenicScore = 0;

    for (let i = 0; i < treeRows.length; i++) {
        for (let j = 0; j < treeRows[i].length; j++) {
            const height = Number(treeRows[i][j]);
            const viewingDistances = [0, 0, 0, 0];

            for (let k = j - 1; k >= 0; k--) {
                if (j === 0) {
                    break;
                }

                viewingDistances[0]++;

                if (Number(treeRows[i][k]) >= height) {
                    break;
                }
            }

            for (let k = i - 1; k >= 0; k--) {
                if (i === 0) {
                    break;
                }

                viewingDistances[1]++;

                if (Number(treeRows[k][j]) >= height) {
                    break;
                }
            }

            for (let k = j + 1; k <= treeRows[i].length - 1; k++) {
                if (j === treeRows[i].length - 1) {
                    break;
                }

                viewingDistances[2]++;

                if (Number(treeRows[i][k]) >= height) {
                    break;
                }
            }

            for (let k = i + 1; k <= treeRows.length - 1; k++) {
                if (i === treeRows.length - 1) {
                    break;
                }

                viewingDistances[3]++;

                if (Number(treeRows[k][j]) >= height) {
                    break;
                }
            }

            highestScenicScore = Math.max(
                highestScenicScore,
                viewingDistances.reduce((acc, cur) => acc * cur)
            );
        }
    }

    return highestScenicScore;
})();

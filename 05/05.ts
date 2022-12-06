import fs from 'fs';

const [graph, procedure] = fs.readFileSync('05/input.txt', 'utf8').split('\n\n');

const part1 = runProcedure(({ count, from, stacks, to }) => {
    for (let i = 0; i < Number(count); i++) {
        const item = stacks[from].pop();

        if (!item) {
            throw new Error('No item found in stack ' + from);
        }

        stacks[to].push(item);
    }
});

const part2 = runProcedure(({ count, from, stacks, to }) => {
    const arr = stacks[from].splice(stacks[from].length - Number(count), Number(count));

    stacks[to].push(...arr);
});

interface Stacks {
    [key: string]: string[];
}

function runProcedure(stepHandler: (props: { count: string; from: string; stacks: Stacks; to: string }) => void) {
    const lines = graph.split('\n');

    const stacks: { [key: string]: string[] } = {};

    let position = 1;
    while (typeof lines[0][position] === 'string') {
        const stack = lines[lines.length - 1][position];
        stacks[stack] = [];

        for (let i = lines.length - 2; i >= 0; i--) {
            if (lines[i][position] === ' ') {
                continue;
            }

            stacks[stack].push(lines[i][position]);
        }

        position += 4;
    }

    procedure
        .split('\n')
        .filter(Boolean)
        .forEach((step) => {
            const [, count, , from, , to] = step.split(' ');

            stepHandler({ count, from, stacks, to });
        });

    return Object.values(stacks).reduce((string, stack) => string + stack.at(-1), '');
}

console.log('Part 1:', part1);
console.log('Part 2:', part2);

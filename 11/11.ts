import fs from 'fs';

const monkeys = fs.readFileSync('11/input.txt', 'utf8').split('\n\n').filter(Boolean);

const part1 = (() => {
    const cache: {
        [name: string]: {
            items: number[];
            inspectedCount: number;
            divisibleBy: number;
            nextMonkey: [string, string]; // [monkey if true, monkey if false]
            operation: string;
        };
    } = {};

    for (const monkey of monkeys) {
        const [name, startingItems, operation, test, ifTrue, ifFalse] = monkey.split('\n');

        const splitTest = test.split(' ');
        const splitIfTrue = ifTrue.split(' ');
        const splitIfFalse = ifFalse.split(' ');

        cache[name.split(' ')[1].split(':')[0]] = {
            items: startingItems.split('Starting items: ')[1].split(', ').map(Number),
            inspectedCount: 0,
            divisibleBy: Number(splitTest[splitTest.length - 1]),
            nextMonkey: [splitIfTrue[splitIfTrue.length - 1], splitIfFalse[splitIfFalse.length - 1]],
            operation: operation.split('new = ')[1]
        };
    }

    for (let round = 1; round <= 20; round++) {
        for (const monkey of Object.keys(cache)) {
            const { items, divisibleBy, nextMonkey, operation } = cache[monkey];

            while (items.length) {
                const old = items.shift();
                const nextWorryLevel = Math.floor(eval(operation) / 3);
                cache[nextMonkey[nextWorryLevel % divisibleBy === 0 ? 0 : 1]].items.push(nextWorryLevel);
                cache[monkey].inspectedCount++;
            }
        }
    }

    return Object.values(cache)
        .map(({ inspectedCount }) => inspectedCount)
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((product, count) => product * count);
})();

const part2 = (() => {
    const cache: {
        [name: string]: {
            items: bigint[];
            inspectedCount: number;
            divisibleBy: bigint;
            nextMonkey: [string, string]; // [monkey if true, monkey if false]
            operation: string;
        };
    } = {};

    for (const monkey of monkeys) {
        const [name, startingItems, operation, test, ifTrue, ifFalse] = monkey.split('\n');

        const splitTest = test.split(' ');
        const splitIfTrue = ifTrue.split(' ');
        const splitIfFalse = ifFalse.split(' ');

        cache[name.split(' ')[1].split(':')[0]] = {
            items: startingItems.split('Starting items: ')[1].split(', ').map(BigInt),
            inspectedCount: 0,
            divisibleBy: BigInt(splitTest[splitTest.length - 1]),
            nextMonkey: [splitIfTrue[splitIfTrue.length - 1], splitIfFalse[splitIfFalse.length - 1]],
            operation: operation.split('new = ')[1]
        };
    }

    const mod = Object.values(cache).reduce((product, { divisibleBy }) => product * divisibleBy, 1n);

    for (let round = 1; round <= 10000; round++) {
        for (const monkey of Object.keys(cache)) {
            const { items, divisibleBy, nextMonkey, operation } = cache[monkey];

            while (items.length) {
                const old = items.shift();

                const opArr = operation.split(' ');
                const nextOpString = `${opArr.slice(0, 2).join(' ')} ${
                    opArr[2] === 'old' ? 'old' : `BigInt(${opArr[2]})`
                }`;

                const nextWorryLevel = eval(nextOpString) % mod;

                cache[nextMonkey[nextWorryLevel % divisibleBy === 0n ? 0 : 1]].items.push(nextWorryLevel);
                cache[monkey].inspectedCount++;
            }
        }
    }

    return Object.values(cache)
        .map(({ inspectedCount }) => inspectedCount)
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((product, count) => product * count);
})();

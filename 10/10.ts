import fs from 'fs';

const input = fs.readFileSync('10/input.txt', 'utf8').split('\n').filter(Boolean);

const part1_redo = (() => {
    const instructions = [...input];

    let x = 1;
    let cycle = 1;

    let addV: null | number = null;

    const signalStrengths: number[] = [];

    while (cycle <= 220) {
        if ((cycle - 20) % 40 === 0) {
            signalStrengths.push(x * cycle);
        }

        if (typeof addV === 'number') {
            x += addV;
            addV = null;
            cycle++;
            continue;
        }

        const instruction = instructions.shift();

        if (!instruction) {
            break;
        }

        const [command, v] = instruction.split(' ');

        if (command === 'noop') {
            cycle++;
            continue;
        }

        addV = Number(v);
        cycle++;
    }

    return signalStrengths.reduce((sum, strength) => sum + strength, 0);
})();

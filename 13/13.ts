import fs from 'fs';

type Packet = (number | Packet)[];

const input = fs.readFileSync('13/input.txt', 'utf8');

const asArray = (arg: Packet | number) => {
    if (typeof arg === 'number') {
        return [arg];
    }

    return arg;
};

const getHasCorrectOrder = (leftPacket: Packet, rightPacket: Packet): undefined | boolean => {
    const left = leftPacket[0];
    const right = rightPacket[0];

    if (left === undefined && right === undefined) {
        return undefined;
    }

    if (left === undefined && right !== undefined) {
        return true;
    }

    if (left !== undefined && right === undefined) {
        return false;
    }

    if (typeof left === 'number' && typeof right === 'number') {
        if (left === right) {
            return getHasCorrectOrder(leftPacket.slice(1), rightPacket.slice(1));
        }

        return left < right;
    }

    if (Array.isArray(left) && Array.isArray(right)) {
        return getHasCorrectOrder(left, right) ?? getHasCorrectOrder(leftPacket.slice(1), rightPacket.slice(1));
    }

    return (
        getHasCorrectOrder(asArray(left), asArray(right)) ??
        getHasCorrectOrder(leftPacket.slice(1), rightPacket.slice(1))
    );
};

const part1 = (() => {
    const pairs = input.trim().split('\n\n');
    const indices: number[] = [];

    for (let i = 0; i < pairs.length; i++) {
        if (
            getHasCorrectOrder(...(pairs[i].split('\n').map((string) => JSON.parse(string)) as [Packet, Packet])) ===
            true
        ) {
            indices.push(i + 1);
        }
    }

    return indices.reduce((sum, index) => sum + index, 0);
})();

const part2 = (() => {
    const packets = input.split('\n').filter(Boolean);
    packets.push('[[2]]', '[[6]]');

    packets.sort((a, b) => {
        if (getHasCorrectOrder(JSON.parse(a), JSON.parse(b)) === true) {
            return -1;
        }

        return 1;
    });

    return (packets.indexOf('[[6]]') + 1) * (packets.indexOf('[[2]]') + 1);
})();

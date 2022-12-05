import fs from 'fs';

const rucksacks = fs.readFileSync('03/input.txt', 'utf8').split('\n').filter(Boolean);

const getItemPriority = (item: string) => {
    const code = item.charCodeAt(0);

    if (code >= 65 && code <= 90) {
        return code - 38;
    }

    return code - 96;
};

const part1 = rucksacks.reduce((total, rucksack) => {
    const midpoint = rucksack.length / 2;

    const compartment_a = rucksack.slice(0, midpoint);
    const compartment_b = rucksack.slice(midpoint);

    const mispackedItem = compartment_a.split('').find((item) => compartment_b.includes(item));

    if (!mispackedItem) {
        throw new Error('No mispacked item found');
    }

    return total + getItemPriority(mispackedItem);
}, 0);

const part2 = (() => {
    let total = 0;

    for (let i = 0; i < rucksacks.length; i += 3) {
        const group = rucksacks.slice(i, i + 3);

        const badgeItem = group[0].split('').find((item) => group[1].includes(item) && group[2].includes(item));

        if (!badgeItem) {
            throw new Error('No badge item found at index ' + i);
        }

        total += getItemPriority(badgeItem);
    }

    return total;
})();

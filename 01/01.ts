import fs from 'fs';

const data = fs.readFileSync('01/input.txt', 'utf8').split('\n\n');

const part1 = data.reduce((mostCalories, elf) => {
    const calories = elf.split('\n').reduce((total, calories) => total + Number(calories), 0);

    return calories > mostCalories ? calories : mostCalories;
}, 0);

const part2 = (() => {
    const topThree = data.reduce(
        (acc, elf) => {
            const calories = elf.split('\n').reduce((total, calories) => total + Number(calories), 0);

            if (calories > acc[0]) {
                acc[0] = calories;
                acc.sort((a, b) => a - b);
            }

            return acc;
        },
        [0, 0, 0]
    );

    return topThree.reduce((total, calories) => total + calories, 0);
})();

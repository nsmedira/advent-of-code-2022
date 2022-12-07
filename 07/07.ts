import fs from 'fs';

interface Directory {
    [key: string]: number | Directory;
}

const output = fs.readFileSync('07/input.txt', 'utf8').split('\n').filter(Boolean);

const root: Directory = {};

let currentPath = '';

for (const line of output) {
    if (line === '$ cd /') {
        currentPath = '';
        continue;
    }

    if (line === '$ cd ..') {
        currentPath = currentPath.split('/').slice(0, -1).join('/');
        continue;
    }

    if (line.startsWith('$ cd')) {
        currentPath += '/' + line.slice(5);
        continue;
    }

    if (line === '$ ls') {
        continue;
    }

    const dir = ((path: string) => {
        if (path === '') {
            return root;
        }

        return path
            .split('/')
            .filter(Boolean)
            .reduce((current, dir) => current[dir] as Directory, root);
    })(currentPath);

    if (line.startsWith('dir')) {
        dir[line.slice(4)] = {};
        continue;
    }

    const [size, filename] = line.split(' ');

    dir[filename] = Number(size);
}

const getDirectorySize = (dir: Directory): number =>
    Object.values(dir).reduce((size: number, value) => {
        if (typeof value !== 'number') {
            return size + getDirectorySize(value);
        }

        return size + value;
    }, 0);

const traverse = (dir: Directory, callback: (size: number) => void) => {
    callback(getDirectorySize(dir));

    Object.values(dir).forEach((value) => {
        if (typeof value === 'number') {
            return;
        }

        traverse(value, callback);
    });
};

const part1 = (() => {
    const directorySizes: number[] = [];

    traverse(root, (size) => {
        if (size > 100000) {
            return;
        }

        directorySizes.push(size);
    });

    return directorySizes.reduce((total, size) => total + size, 0);
})();

const part2 = (() => {
    const threshold = getDirectorySize(root) - (70000000 - 30000000);

    let smallest: number | undefined;

    traverse(root, (size) => {
        if (size < threshold) {
            return;
        }

        if (smallest === undefined || size < smallest) {
            smallest = size;
        }
    });

    return smallest;
})();

const match = 1;
const mismatch = -1;
const gap = -2;

export const fillTable = (firstSequence: string, secondSequence: string): Array<Array<number>> => {
    const table: Array<Array<number>> = new Array<Array<number>>(firstSequence.length + 1).fill([]);
    table.forEach((_, i) => table[i] = new Array<number>(secondSequence.length + 1).fill(0));

    table.forEach((_, i) => table[i][0] = i * gap);
    table[0].forEach((_, j) => table[0][j] = j * gap);

    const tableFunc = (i: number, j: number) => {
        const diag = table[i - 1][j - 1] + (firstSequence[i - 1] === secondSequence[j - 1] ? match : mismatch);
        const left = table[i][j - 1] + gap;
        const top = table[i - 1][j] + gap;

        return Math.max(diag, left, top);
    };

    for (let i = 1; i < table.length; i++) {
        for (let j = 1; j < table[i].length; j++) {
            table[i][j] = tableFunc(i, j);
        }
    }

    return table;
};

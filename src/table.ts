const match = 1;
const mismatch = -1;
const gap = -2;

export enum Direction {
    DIAG = 'DIAG',
    LEFT = 'LEFT',
    TOP = 'TOP'
}

export type TableItem = {
    score: number;
    direction?: Direction;
}

export const fillTable = (firstSequence: string, secondSequence: string): Array<Array<TableItem>> => {
    const table: Array<Array<TableItem>> = new Array<Array<TableItem>>(firstSequence.length + 1).fill([]);
    table.forEach((_, i) => table[i] = new Array<TableItem>(secondSequence.length + 1)
        .fill({ score: 0 }));

    table.forEach((_, i) => table[i][0] = { score: i * gap, direction: Direction.TOP });
    table[0].forEach((_, j) => table[0][j] = { score: j * gap, direction: Direction.LEFT });
    
    table[0][0] = { score: 0 };

    const tableFunc = (i: number, j: number): TableItem => {
        const diag = table[i - 1][j - 1].score + (firstSequence[i - 1] === secondSequence[j - 1] ? match : mismatch);
        const left = table[i][j - 1].score + gap;
        const top = table[i - 1][j].score + gap;
        const score = Math.max(diag, left, top);
        const direction = score === diag ? Direction.DIAG : score === left ? Direction.LEFT : Direction.TOP;

        return {
            score,
            direction
        };
    };

    for (let i = 1; i < table.length; i++) {
        for (let j = 1; j < table[i].length; j++) {
            table[i][j] = tableFunc(i, j);
        }
    }

    return table;
};

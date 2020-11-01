import { GAP } from '../common/constants';
import { ScoreFunc, Direction } from '../common/types';

type TableItem = {
    score: number;
    direction?: Direction;
}

export const createTable = (firstSequence: string, secondSequence: string, scoreFunc: ScoreFunc): Array<Array<TableItem>> => {
    const table: Array<Array<TableItem>> = new Array<Array<TableItem>>(firstSequence.length + 1)
        .fill([])
        .map(() => new Array<TableItem>(secondSequence.length + 1).fill({ score: 0 }));

    for (let i = 1; i < table.length; i++) {
        table[i][0] = { score: i * scoreFunc(GAP, GAP), direction: Direction.TOP };
    }

    for (let j = 1; j < table[0].length; j++) {
        table[0][j] = { score: j * scoreFunc(GAP, GAP), direction: Direction.LEFT };
    }

    const tableInnerFunc = (i: number, j: number): TableItem => {
        const diag = table[i - 1][j - 1].score + scoreFunc(firstSequence[i - 1], secondSequence[j - 1]);
        const left = table[i][j - 1].score + scoreFunc(GAP, secondSequence[j - 1]);
        const top = table[i - 1][j].score + scoreFunc(firstSequence[i - 1], GAP);

        const score = Math.max(diag, left, top);
        const direction = score === diag ? Direction.DIAG : score === left ? Direction.LEFT : Direction.TOP;

        return {
            score,
            direction
        };
    };

    for (let i = 1; i < table.length; i++) {
        for (let j = 1; j < table[i].length; j++) {
            table[i][j] = tableInnerFunc(i, j);
        }
    }

    return table;
};

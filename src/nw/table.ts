import { TableItem, ScoreMetrics, PrimaryItem } from '../common/types';
import { M, I, D } from '../common/constants';

export const createTable = (firstSequence: string, secondSequence: string, metrics: ScoreMetrics): Array<Array<TableItem>> => {
    const table = initTable(firstSequence, secondSequence, metrics);

    const calcM = (i: number, j: number): PrimaryItem => {
        const prevM = table[i - 1][j - 1][M].score + metrics.scoreFunc(firstSequence[j - 1], secondSequence[i - 1]);
        const prevI = table[i - 1][j - 1][I].score + metrics.scoreFunc(firstSequence[j - 1], secondSequence[i - 1]);
        const prevD = table[i - 1][j - 1][D].score + metrics.scoreFunc(firstSequence[j - 1], secondSequence[i - 1]);

        const score = Math.max(prevM, prevI, prevD);
        const ancestor = score === prevM ? M : score === prevI ? I : D;

        return { score, ancestor };
    };

    const calcI = (i: number, j: number): PrimaryItem => {
        const prevM = table[i][j - 1][M].score + metrics.openGap;
        const prevI = table[i][j - 1][I].score + metrics.extendGap;
        const prevD = table[i][j - 1][D].score + metrics.openGap;

        const score = Math.max(prevM, prevI, prevD);
        const ancestor = score === prevM ? M : score === prevI ? I : D;

        return { score, ancestor };
    };

    const calcD = (i: number, j: number): PrimaryItem => {
        const prevM = table[i - 1][j][M].score + metrics.openGap;
        const prevI = table[i - 1][j][I].score + metrics.openGap;
        const prevD = table[i - 1][j][D].score + metrics.extendGap;

        const score = Math.max(prevM, prevI, prevD);
        const ancestor = score === prevM ? M : score === prevI ? I : D;

        return { score, ancestor };
    };

    for (let i = 1; i < table.length; i++) {
        for (let j = 1; j < table[i].length; j++) {
            table[i][j] = {
                M: calcM(i, j),
                I: calcI(i, j),
                D: calcD(i, j)
            };
        }
    }

    return table;
};

const initTable = (firstSequence: string, secondSequence: string, metrics: ScoreMetrics): Array<Array<TableItem>> => {
    const table: Array<Array<TableItem>> = new Array<Array<TableItem>>(secondSequence.length + 1)
        .fill([])
        .map(() => new Array<TableItem>(firstSequence.length + 1).fill({
            M: { score: 0 },
            I: { score: -Infinity },
            D: { score: -Infinity },
        }));

    for (let i = 1; i < table.length; i++) {
        table[i][0] = {
            M: { score: -Infinity },
            I: { score: -Infinity },
            D: {
                score: metrics.openGap + (i - 1) * metrics.extendGap,
                ancestor: D
            }
        };
    }

    for (let j = 1; j < table[0].length; j++) {
        table[0][j] = {
            M: { score: -Infinity },
            I: {
                score: metrics.openGap + (j - 1) * metrics.extendGap,
                ancestor: I
            },
            D: { score: -Infinity }
        };
    }

    return table;
};

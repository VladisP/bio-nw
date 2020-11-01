import { createTable } from './table';
import { ScoreFunc, Direction, AlignmentResult } from '../common/types';
import { GAP } from '../common/constants';

export const nwAlign = (firstSeq: string, secondSeq: string, scoreFunc: ScoreFunc): AlignmentResult => {
    const table = createTable(firstSeq, secondSeq, scoreFunc);
    const score = table[firstSeq.length][secondSeq.length].score;

    let alignmentFirst = '';
    let alignmentSecond = '';
    let i = firstSeq.length;
    let j = secondSeq.length;
    let item = table[i][j];

    while (item.direction) {
        switch (item.direction) {
        case Direction.DIAG:
            alignmentFirst = firstSeq[i - 1] + alignmentFirst;
            alignmentSecond = secondSeq[j - 1] + alignmentSecond;
            i--;
            j--;
            break;
        case Direction.LEFT:
            alignmentFirst = GAP + alignmentFirst;
            alignmentSecond = secondSeq[j - 1] + alignmentSecond;
            j--;
            break;
        case Direction.TOP:
            alignmentFirst = firstSeq[i - 1] + alignmentFirst;
            alignmentSecond = GAP + alignmentSecond;
            i--;
            break;
        }

        item = table[i][j];
    }

    return {
        seq1: alignmentFirst,
        seq2: alignmentSecond,
        score,
    };
};

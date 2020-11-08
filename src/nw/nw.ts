import { createTable } from './table';
import { AlignmentResult, ScoreMetrics } from '../common/types';
import { GAP, M, I, D } from '../common/constants';

export const nwAlign = (firstSeq: string, secondSeq: string, metrics: ScoreMetrics): AlignmentResult => {
    const table = createTable(firstSeq, secondSeq, metrics);

    const match = table[secondSeq.length][firstSeq.length][M];
    const ins = table[secondSeq.length][firstSeq.length][I];
    const del = table[secondSeq.length][firstSeq.length][D];

    const score = Math.max(match.score, ins.score, del.score);
    let action: string | undefined = score === match.score ? M : score === ins.score ? I : D;

    let alignmentFirst = '';
    let alignmentSecond = '';
    let i = secondSeq.length;
    let j = firstSeq.length;

    while (i !== 0 || j !== 0) {
        switch (action) {
        case M:
            alignmentFirst = firstSeq[j - 1] + alignmentFirst;
            alignmentSecond = secondSeq[i - 1] + alignmentSecond;
            action = table[i][j][action].ancestor;
            i--;
            j--;
            break;
        case I:
            alignmentFirst = firstSeq[j - 1] + alignmentFirst;
            alignmentSecond = GAP + alignmentSecond;
            action = table[i][j][action].ancestor;
            j--;
            break;
        case D:
            alignmentFirst = GAP + alignmentFirst;
            alignmentSecond = secondSeq[i - 1] + alignmentSecond;
            action = table[i][j][action].ancestor;
            i--;
            break;
        }
    }

    return {
        seq1: alignmentFirst,
        seq2: alignmentSecond,
        score,
    };
};

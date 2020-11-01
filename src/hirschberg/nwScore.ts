import { ScoreFunc } from '../common/types';
import { GAP } from '../common/constants';

export const nwScore = (firstSeq: string, secondSeq: string, sf: ScoreFunc): Array<number> => {
    const score: Array<Array<number>> = new Array<Array<number>>(2)
        .fill([])
        .map(() => new Array<number>(secondSeq.length + 1).fill(0));

    for (let j = 1; j < score[0].length; j++) {
        score[0][j] = score[0][j - 1] + sf(GAP, GAP);
    }

    for (let i = 0; i < firstSeq.length; i++) {
        score[1][0] = score[0][0] + sf(GAP, GAP);

        for (let j = 0; j < secondSeq.length; j++) {
            const score1 = score[0][j] + sf(firstSeq[i], secondSeq[j]);
            const score2 = score[0][j + 1] + sf(GAP, GAP);
            const score3 = score[1][j] + sf(GAP, GAP);

            score[1][j + 1] = Math.max(score1, score2, score3);
        }

        score[0] = score[1].slice();
    }

    return score[1];
};

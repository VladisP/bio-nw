import { AlignmentResult, ScoreFunc } from '../common/types';
import { nwAlign } from '../nw/nw';
import { GAP } from '../common/constants';
import { nwScore } from './nwScore';

export const hirschbergAlign = (firstSeq: string, secondSeq: string, sf: ScoreFunc): AlignmentResult => {
    let alignFirst = '';
    let alignSecond = '';

    if (firstSeq.length === 0) {
        for (const char of secondSeq) {
            alignFirst += GAP;
            alignSecond += char;
        }

        return {
            seq1: alignFirst,
            seq2: alignSecond
        };
    }

    if (secondSeq.length === 0) {
        for (const char of firstSeq) {
            alignFirst += char;
            alignSecond += GAP;
        }

        return {
            seq1: alignFirst,
            seq2: alignSecond
        };
    }

    if (firstSeq.length === 1 || secondSeq.length === 1) {
        return nwAlign(firstSeq, secondSeq, sf);
    }

    const xLen = firstSeq.length;
    const xMid = Math.trunc(xLen / 2);
    const yLen = secondSeq.length;

    const scoreL = nwScore(
        firstSeq.slice(0, xMid),
        secondSeq,
        sf
    );
    const scoreR = nwScore(
        reverse(firstSeq.slice(xMid, xLen)),
        reverse(secondSeq),
        sf
    );
    const yMid = argMax(scoreL, scoreR.reverse());

    const h1 = hirschbergAlign(
        firstSeq.slice(0, xMid),
        secondSeq.slice(0, yMid),
        sf
    );
    const h2 = hirschbergAlign(
        firstSeq.slice(xMid, xLen),
        secondSeq.slice(yMid, yLen),
        sf
    );

    return {
        seq1: h1.seq1 + h2.seq1,
        seq2: h1.seq2 + h2.seq2
    };
};

const argMax = (score1: Array<number>, score2: Array<number>): number => {
    let max = Number.MIN_SAFE_INTEGER;
    let arg = -1;

    for (let i = 0; i < score1.length; i++) {
        if (score1[i] + score2[i] > max) {
            max = score1[i] + score2[i];
            arg = i;
        }
    }

    return arg;
};

const reverse = (s: string): string => [...s].reverse().join('');

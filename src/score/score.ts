import { BLOSUM62 } from '../common/constants';
import { ScoreMetrics } from '../common/types';
import { isValid, isDNA, isAmino } from './helpers';

const dnaScoreFunc = (a: string, b: string): number => a === b ? 5 : -4;

const aminoScoreFunc = (a: string, b: string): number => BLOSUM62[a][b];

const defaultScoreFunc = (a: string, b: string): number => a === b ? 1 : -1;

export const getScoreMetrics = (firstSeq: string, secondSeq: string, openGap: number, extendGap: number): ScoreMetrics => {
    if (!isValid(firstSeq) || !isValid(secondSeq)) {
        throw new Error('Invalid sequences');
    }

    if (isDNA(firstSeq) && isDNA(secondSeq)) {
        return {
            scoreFunc: dnaScoreFunc,
            openGap,
            extendGap
        };
    }

    if (isAmino(firstSeq) && isAmino(secondSeq)) {
        return {
            scoreFunc: aminoScoreFunc,
            openGap,
            extendGap
        };
    }

    return {
        scoreFunc: defaultScoreFunc,
        openGap,
        extendGap
    };
};

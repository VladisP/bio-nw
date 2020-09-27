import { BLOSUM62 } from '../common/constants';
import { ScoreFunc } from '../common/types';
import { isValid, isDNA, isAmino, scoreFuncDecorator } from './helpers';

const dnaScoreFunc = (a: string, b: string): number => a === b ? 5 : -4;

const aminoScoreFunc = (a: string, b: string): number => BLOSUM62[a][b];

const defaultScoreFunc = (a: string, b: string): number => a === b ? 1 : -1;

export const getScoreFunc = (firstSeq: string, secondSeq: string, gap = -2): ScoreFunc => {
    if (!isValid(firstSeq) || !isValid(secondSeq)) {
        throw new Error('Invalid sequences');
    }

    if (isDNA(firstSeq) && isDNA(secondSeq)) {
        return scoreFuncDecorator(dnaScoreFunc, gap);
    }

    if (isAmino(firstSeq) && isAmino(secondSeq)) {
        return scoreFuncDecorator(aminoScoreFunc, gap);
    }

    return scoreFuncDecorator(defaultScoreFunc, gap);
};

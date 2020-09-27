import { ScoreFunc } from '../common/types';
import { GAP } from '../common/constants';

export const isValid = (seq: string): boolean => {
    return /^[A-Z]+$/.test(seq);
};

export const isDNA = (seq: string): boolean => {
    return /^[ATGC]+$/.test(seq);
};

export const isAmino = (seq: string): boolean => {
    return /^[ARNDCQEGHILKMFPSTWYV]+$/.test(seq);
};

export const scoreFuncDecorator = (scoreFunc: ScoreFunc, gap: number): ScoreFunc => (a: string, b: string): number => {
    if (a === GAP || b === GAP) {
        return gap;
    }

    return scoreFunc(a, b);
};

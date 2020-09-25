import { Direction, fillTable } from './table';

type AlignmentOutput = {
    firstSeq: string;
    secondSeq: string;
    score: number;
}

export const alignment = (firstSeq: string, secondSeq: string): AlignmentOutput => {
    const table = fillTable(firstSeq, secondSeq);
    const score = table[firstSeq.length][secondSeq.length].score;

    const smallSeq = firstSeq.length > secondSeq.length ? secondSeq : firstSeq;
    let i = firstSeq.length;
    let j = secondSeq.length;
    let seqIndex = smallSeq.length - 1;
    let res = '';
    let item = table[i][j];

    while (item.direction) {
        switch (item.direction) {
        case Direction.DIAG:
            res += smallSeq[seqIndex];
            seqIndex--;
            i -= 1;
            j -= 1;
            break;
        case Direction.LEFT:
            res += '-';
            j -= 1;
            break;
        case Direction.TOP:
            res += '-';
            i -= 1;
            break;
        }

        item = table[i][j];
    }

    res = res.split('').reverse().join('');

    return {
        firstSeq: firstSeq.length > secondSeq.length ? firstSeq : res,
        secondSeq: firstSeq.length > secondSeq.length ? res : secondSeq,
        score,
    };
};

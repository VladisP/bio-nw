export type ProgramInput = {
    firstFilePath: string;
    secondFilePath?: string;
    outputFilePath?: string;
    gapOpen: number;
    gapExtend: number;
}

export type AlignmentResult = {
    seq1: string;
    seq2: string;
    score: number;
}

export type PrimaryItem = {
    score: number;
    ancestor?: 'M' | 'I' | 'D';
}

export type TableItem = {
    M: PrimaryItem;
    I: PrimaryItem;
    D: PrimaryItem;
}

export type ScoreMetrics = {
    scoreFunc: (a: string, b: string) => number;
    openGap: number;
    extendGap: number;
}

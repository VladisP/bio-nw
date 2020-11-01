export type ProgramInput = {
    firstFilePath: string;
    secondFilePath?: string;
    outputFilePath?: string;
    hirschberg?: boolean;
    gap?: number;
}

export type AlignmentResult = {
    seq1: string;
    seq2: string;
    score?: number;
}

export interface ScoreFunc {
    (a: string, b: string): number;
}

export enum Direction {
    DIAG = 'DIAG',
    LEFT = 'LEFT',
    TOP = 'TOP'
}

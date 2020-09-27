export type ProgramInput = {
    firstFilePath: string;
    secondFilePath?: string;
    outputFilePath?: string;
    gap?: number;
}

export interface ScoreFunc {
    (a: string, b: string): number;
}

export enum Direction {
    DIAG = 'DIAG',
    LEFT = 'LEFT',
    TOP = 'TOP'
}

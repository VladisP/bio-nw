export interface ScoreFunc {
    (a: string, b: string): number;
}

export enum Direction {
    DIAG = 'DIAG',
    LEFT = 'LEFT',
    TOP = 'TOP'
}

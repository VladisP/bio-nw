import { align } from '../src/core/alignment';
import { getScoreFunc } from '../src/score/score';

describe('DNA tests', () => {
    it('test 1', () => {
        const firstSeq = 'AATCG';
        const secondSeq = 'AACG';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(align(firstSeq, secondSeq, sf)).toStrictEqual({
            firstSeq: 'AATCG',
            secondSeq: 'AA-CG',
            score: 10
        });
    });

    it('test 2', () => {
        const firstSeq = 'GTACAACG';
        const secondSeq = 'AATCGTAGCGA';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(align(firstSeq, secondSeq, sf)).toStrictEqual({
            firstSeq: '-GT-ACAACG-',
            secondSeq: 'AATCGTAGCGA',
            score: -26
        });
    });

    it('test 3', () => {
        const firstSeq = 'GTACAACGTTA';
        const secondSeq = 'AATCGTAGCGA';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(align(firstSeq, secondSeq, sf)).toStrictEqual({
            firstSeq: 'GTACAACGTTA',
            secondSeq: 'AATCGTAGCGA',
            score: -17
        });
    });

    it('test 4', () => {
        const firstSeq = 'GCGCGTGCGCGGAAGGAGCCAAGGTGAAGTTGTAGCAGTGTGTCAGAAGAGGTGCGTGGCACCATGCTGTCCCCCGAGGCGGAGCGGGTGCTGCGGTACCTGGTCGAAGTAGAGGAGTTG';
        const secondSeq = 'GACTTGTGGAACCTACTTCCTGAAAATAACCTTCTGTCCTCCGAGCTCTCCGCACCCGTGGATGACCTGCTCCCGTACACAGATGTTGCCACCTGGCTGGATGAATGTCCGAATGAAGCG';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(align(firstSeq, secondSeq, sf)).toStrictEqual({
            firstSeq: 'GCGCGTGCGCGGAAGGAGCCAAGGTGAAGTTGTAGCAGTGTGTCAGAAGAGGTGCGTGGCA-CCAT-GCTGTCCCCCGAGGCGGA-GCGGGTGCTG-C-GGTACCTGGTCGAA-GT-AG-AGGAGTTG',
            secondSeq: 'G-AC-T-TGTGGAA-CCTACTTCCTGAA--AATAACCTTCTGTCCTCCGAGCT-CTCCGCACCCGTGGATGACCTGC-TCCCGTACACAGATGTTGCCACCTGGCTGGATGAATGTCCGAATGAAGCG',
            score: -41
        });
    });
});

import { nwAlign } from '../../src/nw/nw';
import { getScoreFunc } from '../../src/score/score';

describe('NW DNA tests', () => {
    it('test 1', () => {
        const firstSeq = 'AATCG';
        const secondSeq = 'AACG';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'AATCG',
            seq2: 'AA-CG',
            score: 10
        });
    });

    it('test 2', () => {
        const firstSeq = 'GTACAACG';
        const secondSeq = 'AATCGTAGCGA';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: '-GT-ACAACG-',
            seq2: 'AATCGTAGCGA',
            score: -26
        });
    });

    it('test 3', () => {
        const firstSeq = 'GTACAACGTTA';
        const secondSeq = 'AATCGTAGCGA';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'GTACAACGTTA',
            seq2: 'AATCGTAGCGA',
            score: -17
        });
    });

    it('test 4', () => {
        const firstSeq = 'GCGCGTGCGCGGAAGGAGCCAAGGTGAAGTTGTAGCAGTGTGTCAGAAGAGGTGCGTGGCACCATGCTGTCCCCCGAGGCGGAGCGGGTGCTGCGGTACCTGGTCGAAGTAGAGGAGTTG';
        const secondSeq = 'GACTTGTGGAACCTACTTCCTGAAAATAACCTTCTGTCCTCCGAGCTCTCCGCACCCGTGGATGACCTGCTCCCGTACACAGATGTTGCCACCTGGCTGGATGAATGTCCGAATGAAGCG';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'GCGCGTGCGCGGAAGGAGCCAAGGTGAAGTTGTAGCAGTGTGTCAGAAGAGGTGCGTGGCA-CCAT-GCTGTCCCCCGAGGCGGA-GCGGGTGCTG-C-GGTACCTGGTCGAA-GT-AG-AGGAGTTG',
            seq2: 'G-AC-T-TGTGGAA-CCTACTTCCTGAA--AATAACCTTCTGTCCTCCGAGCT-CTCCGCACCCGTGGATGACCTGC-TCCCGTACACAGATGTTGCCACCTGGCTGGATGAATGTCCGAATGAAGCG',
            score: -41
        });
    });
});

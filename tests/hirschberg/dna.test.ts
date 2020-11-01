import { getScoreFunc } from '../../src/score/score';
import { hirschbergAlign } from '../../src/hirschberg/hirschberg';

describe('Hirschberg DNA tests', () => {
    it('test 1', () => {
        const firstSeq = 'AATCG';
        const secondSeq = 'AACG';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(hirschbergAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'AATCG',
            seq2: 'AA-CG',
        });
    });

    it('test 2', () => {
        const firstSeq = 'GTACAACG';
        const secondSeq = 'AATCGTAGCGA';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(hirschbergAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'GTACA-A-CG-',
            seq2: 'AATCGTAGCGA',
        });
    });

    it('test 3', () => {
        const firstSeq = 'GTACAACGTTA';
        const secondSeq = 'AATCGTAGCGA';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(hirschbergAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'GTACAACGTTA',
            seq2: 'AATCGTAGCGA',
        });
    });

    it('test 4', () => {
        const firstSeq = 'AGTACGCA';
        const secondSeq = 'TATGC';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(hirschbergAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'AGTACGCA',
            seq2: '--TATGC-',
        });
    });

    it('test 5', () => {
        const firstSeq = 'GCGCGTGCGCGGAAGGAGCCAAGGTGAAGTTGTAGCAGTGTGTCAGAAGAGGTGCGTGGCACCATGCTGTCCCCCGAGGCGGAGCGGGTGCTGCGGTACCTGGTCGAAGTAGAGGAGTTG';
        const secondSeq = 'GACTTGTGGAACCTACTTCCTGAAAATAACCTTCTGTCCTCCGAGCTCTCCGCACCCGTGGATGACCTGCTCCCGTACACAGATGTTGCCACCTGGCTGGATGAATGTCCGAATGAAGCG';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(hirschbergAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'GCGCGTGCGCGGAAGGAGCCAAGGTGAAGTTGTAGCAGTGTGTCAGAAGAGGTGCGTGGCACCA-TGC-TGTCCCCCGAGGCGGAG-CGGGTGCTGCGG--TACCTGGTCGAA-GTA-GAG-GAGTTG',
            seq2: 'G-AC-T-TGTGGAA-CCTACTTCCTGAA--AATAACCTTCTGTCCTCCGAGCT-CTCCGCACCCGTGGATGACCTGC-TCCCGTACACAGATGTTGCCACCTGGCTGGATGAATGTCCGAATGAAGCG',
        });
    });
});

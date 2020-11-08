import { nwAlign } from '../src/nw/nw';
import { getScoreMetrics } from '../src/score/score';

const openGap = -10;
const extendGap = -1;

describe('NW DNA tests', () => {
    it('test 1', () => {
        const firstSeq = 'AT';
        const secondSeq = 'G';
        const sf = getScoreMetrics(firstSeq, secondSeq, openGap, extendGap);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'AT',
            seq2: '-G',
            score: -14
        });
    });

    it('test 2', () => {
        const firstSeq = 'ACGT';
        const secondSeq = 'ACGGCTT';
        const sf = getScoreMetrics(firstSeq, secondSeq, openGap, extendGap);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'ACG---T',
            seq2: 'ACGGCTT',
            score: 8
        });
    });

    it('test 3', () => {
        const firstSeq = 'AATCG';
        const secondSeq = 'AACG';
        const sf = getScoreMetrics(firstSeq, secondSeq, openGap, extendGap);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'AATCG',
            seq2: 'AA-CG',
            score: 10
        });
    });

    it('test 4', () => {
        const firstSeq = 'GTACAACG';
        const secondSeq = 'AATCGTAGCGA';
        const sf = getScoreMetrics(firstSeq, secondSeq, openGap, extendGap);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: '----GTA-CAACG',
            seq2: 'AATCGTAGCGA--',
            score: -13
        });
    });

    it('test 5', () => {
        const firstSeq = 'GTACAACGTTA';
        const secondSeq = 'AATCGTAGCGA';
        const sf = getScoreMetrics(firstSeq, secondSeq, openGap, extendGap);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: '----GTACAACGTTA',
            seq2: 'AATCGTA----GCGA',
            score: -9
        });
    });

    it('test 6', () => {
        const firstSeq = 'GCGCGTGCGCGGAAGGAGCCAAGGTGAAGTTGTAGCAGTGTGTCAGAAGAGGTGCGTGGCACCATGCTGTCCCCCGAGGCGGAGCGGGTGCTGCGGTACCTGGTCGAAGTAGAGGAGTTG';
        const secondSeq = 'GACTTGTGGAACCTACTTCCTGAAAATAACCTTCTGTCCTCCGAGCTCTCCGCACCCGTGGATGACCTGCTCCCGTACACAGATGTTGCCACCTGGCTGGATGAATGTCCGAATGAAGCG';
        const sf = getScoreMetrics(firstSeq, secondSeq, openGap, extendGap);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'G-CGCGTGCGCGGAAGGAGCCAA---GGTGAAGTTGTAGCAGTGTGTCAGAAGAGGTGCGTGGCACCATGCTGTCC---CCCGAGGCGGAGCGGGTGCTGCGGTAC------------------CTGGTCGAA-GT---AGAGGAGTTG',
            seq2: 'GACTTGT--------GGAACCTACTTCCTGAA--AATAACCTTCTGTC---------------CTCCGAGCTCTCCGCACCCGTGGATGACC---TGCTCCCGTACACAGATGTTGCCACCTGGCTGGATGAATGTCCGA-ATGAAGCG',
            score: 46
        });
    });
});

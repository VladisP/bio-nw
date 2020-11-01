import { getScoreFunc } from '../../src/score/score';
import { nwAlign } from '../../src/nw/nw';

describe('NW Amino tests', () => {
    it('test 1', () => {
        const firstSeq = 'ARDCDWVKMF';
        const secondSeq = 'IGKWVKDN';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'ARDCDWVKMF',
            seq2: 'I-G-KWVKDN',
            score: -9
        });
    });

    it('test 2', () => {
        const firstSeq = 'ELKSSAMFP';
        const secondSeq = 'FSHWPDQCK';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'ELKSSAMFP',
            seq2: 'FSHWPDQCK',
            score: -15
        });
    });

    it('test 3', () => {
        const firstSeq = 'SPETVIHSGWVIWRELFSHWPDQCKLLFGDWFAWIHWTYLVYYSAGPPCQGQSDIVVMMQKKLRTNFCQCYKYWYQ';
        const secondSeq = 'SPSDQFFTVIHSCLYWVIWRDLMSHLFMNGAAIDIHWTWDSIAIGPPLVYPIEEVFAGPSTIVVMMQKMLRTNFCQCYKPWYQ';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'SP--E--TVIHS--GWVIWRELFSH-WPDQCKL-LFGDWFAWIHWTYLVYYSAGPPCQGQSDIVVMMQKKLRTNFCQCYKYWYQ',
            seq2: 'SPSDQFFTVIHSCLYWVIWRDLMSHLFMNGAAIDIHWTWDSIAIGPPLV-YPIEEVFAGPSTIVVMMQKMLRTNFCQCYKPWYQ',
            score: 116
        });
    });
});

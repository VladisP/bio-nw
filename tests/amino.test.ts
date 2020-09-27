import { getScoreFunc } from '../src/score/score';
import { align } from '../src/core/alignment';

describe('Amino tests', () => {
    it('test 1', () => {
        const firstSeq = 'ARDCDWVKMF';
        const secondSeq = 'IGKWVKDN';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(align(firstSeq, secondSeq, sf)).toStrictEqual({
            firstSeq: 'ARDCDWVKMF',
            secondSeq: 'I-G-KWVKDN',
            score: -9
        });
    });

    it('test 2', () => {
        const firstSeq = 'ELKSSAMFP';
        const secondSeq = 'FSHWPDQCK';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(align(firstSeq, secondSeq, sf)).toStrictEqual({
            firstSeq: 'ELKSSAMFP',
            secondSeq: 'FSHWPDQCK',
            score: -15
        });
    });

    it('test 3', () => {
        const firstSeq = 'SPETVIHSGWVIWRELFSHWPDQCKLLFGDWFAWIHWTYLVYYSAGPPCQGQSDIVVMMQKKLRTNFCQCYKYWYQ';
        const secondSeq = 'SPSDQFFTVIHSCLYWVIWRDLMSHLFMNGAAIDIHWTWDSIAIGPPLVYPIEEVFAGPSTIVVMMQKMLRTNFCQCYKPWYQ';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(align(firstSeq, secondSeq, sf)).toStrictEqual({
            firstSeq: 'SP--E--TVIHS--GWVIWRELFSH-WPDQCKL-LFGDWFAWIHWTYLVYYSAGPPCQGQSDIVVMMQKKLRTNFCQCYKYWYQ',
            secondSeq: 'SPSDQFFTVIHSCLYWVIWRDLMSHLFMNGAAIDIHWTWDSIAIGPPLV-YPIEEVFAGPSTIVVMMQKMLRTNFCQCYKPWYQ',
            score: 116
        });
    });
});

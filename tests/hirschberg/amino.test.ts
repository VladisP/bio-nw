import { getScoreFunc } from '../../src/score/score';
import { hirschbergAlign } from '../../src/hirschberg/hirschberg';

describe('Hirschberg Amino tests', () => {
    it('test 1', () => {
        const firstSeq = 'ARDCDWVKMF';
        const secondSeq = 'IGKWVKDN';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(hirschbergAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'ARDCDWVKMF',
            seq2: 'I-G-KWVKDN',
        });
    });

    it('test 2', () => {
        const firstSeq = 'ELKSSAMFP';
        const secondSeq = 'FSHWPDQCK';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(hirschbergAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'ELKSSAMFP',
            seq2: 'FSHWPDQCK',
        });
    });

    it('test 3', () => {
        const firstSeq = 'SPETVIHSGWVIWRELFSHWPDQCKLLFGDWFAWIHWTYLVYYSAGPPCQGQSDIVVMMQKKLRTNFCQCYKYWYQ';
        const secondSeq = 'SPSDQFFTVIHSCLYWVIWRDLMSHLFMNGAAIDIHWTWDSIAIGPPLVYPIEEVFAGPSTIVVMMQKMLRTNFCQCYKPWYQ';
        const sf = getScoreFunc(firstSeq, secondSeq, -10);

        expect(hirschbergAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'SP-E---TVIHSG--WVIWRELFSH-WPDQCKL-LFGDWFAWIHWTYLVYYSAGPPCQGQSDIVVMMQKKLRTNFCQCYKYWYQ',
            seq2: 'SPSDQFFTVIHSCLYWVIWRDLMSHLFMNGAAIDIHWTWDSIAIGPPLV-YPIEEVFAGPSTIVVMMQKMLRTNFCQCYKPWYQ',
        });
    });
});

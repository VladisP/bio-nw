import { getScoreMetrics } from '../src/score/score';
import { nwAlign } from '../src/nw/nw';

const openGap = -10;
const extendGap = -1;

describe('NW Amino tests', () => {
    it('test 1', () => {
        const firstSeq = 'ARDCDWVKMF';
        const secondSeq = 'IGKWVKDN';
        const sf = getScoreMetrics(firstSeq, secondSeq, openGap, extendGap);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'ARDCDWVKMF',
            seq2: 'IG--KWVKDN',
            score: -1
        });
    });

    it('test 2', () => {
        const firstSeq = 'ELKSSAMFP';
        const secondSeq = 'FSHWPDQCK';
        const sf = getScoreMetrics(firstSeq, secondSeq, openGap, extendGap);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'ELKSSAMFP',
            seq2: 'FSHWPDQCK',
            score: -15
        });
    });

    it('test 3', () => {
        const firstSeq = 'SPETVIHSGWVIWRELFSHWPDQCKLLFGDWFAWIHWTYLVYYSAGPPCQGQSDIVVMMQKKLRTNFCQCYKYWYQ';
        const secondSeq = 'SPSDQFFTVIHSCLYWVIWRDLMSHLFMNGAAIDIHWTWDSIAIGPPLVYPIEEVFAGPSTIVVMMQKMLRTNFCQCYKPWYQ';
        const sf = getScoreMetrics(firstSeq, secondSeq, openGap, extendGap);

        expect(nwAlign(firstSeq, secondSeq, sf)).toStrictEqual({
            seq1: 'SPE----TVIHS--GWVIWRELFSHWPDQCKLLFGDWFAW-IHWTYLVYYSAGPPC--------QGQSDIVVMMQKKLRTNFCQCYKYWYQ',
            seq2: 'SPSDQFFTVIHSCLYWVIWRDLMSH-------LFMNGAAIDIHWTW-DSIAIGPPLVYPIEEVFAGPSTIVVMMQKMLRTNFCQCYKPWYQ',
            score: 176
        });
    });
});

import { alignment } from '../src/alignment';
import { firstSequence, secondSequence } from '../src/mock';

describe('Test', () => {
    it('first test', () => {
        expect(alignment(firstSequence, secondSequence)).toStrictEqual({
            firstSeq: 'AATCG',
            secondSeq: 'AA-CG',
            score: 2
        });
    });
});

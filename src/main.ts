import { align } from './core/alignment';
import { getScoreFunc } from './score/score';

const firstSequence = 'ARDCDWVKMF';
const secondSequence = 'IGKWVKDN';

console.log(align(firstSequence, secondSequence, getScoreFunc(firstSequence, secondSequence, -10)));

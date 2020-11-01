#!/usr/bin/env node

import * as fs from 'fs';
import { CommandBuilder } from './commander/commandBuilder';
import { parseFasta } from './fasta/fasta.parser';
import { getScoreFunc } from './score/score';
import { ProgramInput } from './common/types';
import { hirschbergAlign } from './hirschberg/hirschberg';
import { nwAlign } from './nw/nw';

CommandBuilder
    .of(process.argv)
    .createAlignCommand(exec)
    .parse();

function exec({ firstFilePath, secondFilePath, outputFilePath, hirschberg, gap }: ProgramInput) {
    Promise.all([
        parseFasta(firstFilePath),
        parseFasta(secondFilePath)
    ]).then(([firstSequences, secondSequences]) => {
        const [firstSeq, secondSeq] = secondFilePath ? [firstSequences[0], secondSequences[0]] : [firstSequences[0], firstSequences[1]];
        const scoreFunc = getScoreFunc(firstSeq, secondSeq, gap);
        const alignFunc = hirschberg ? hirschbergAlign : nwAlign;
        const result = JSON.stringify(alignFunc(firstSeq, secondSeq, scoreFunc), null, 2);

        if (outputFilePath) {
            fs.writeFileSync(outputFilePath, result);
        } else {
            console.log(result);
        }
    }).catch(console.error);
}

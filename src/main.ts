#!/usr/bin/env node

import * as fs from 'fs';
import { CommandBuilder } from './commander/commandBuilder';
import { parseFasta } from './fasta/fasta.parser';
import { getScoreMetrics } from './score/score';
import { ProgramInput } from './common/types';
import { nwAlign } from './nw/nw';

CommandBuilder
    .of(process.argv)
    .createAlignCommand(exec)
    .parse();

function exec({ firstFilePath, secondFilePath, outputFilePath, gapOpen, gapExtend }: ProgramInput) {
    Promise.all([
        parseFasta(firstFilePath),
        parseFasta(secondFilePath)
    ]).then(([firstSequences, secondSequences]) => {
        const [firstSeq, secondSeq] = secondFilePath ? [firstSequences[0], secondSequences[0]] : [firstSequences[0], firstSequences[1]];
        const scoreMetrics = getScoreMetrics(firstSeq, secondSeq, gapOpen, gapExtend);
        const result = JSON.stringify(nwAlign(firstSeq, secondSeq, scoreMetrics), null, 2);

        if (outputFilePath) {
            fs.writeFileSync(outputFilePath, result);
        } else {
            console.log(result);
        }
    }).catch(console.error);
}

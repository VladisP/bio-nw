import { Command } from 'commander';
import { ProgramInput } from '../common/types';

export class CommandBuilder {
    private program = new Command();
    private readonly args: Array<string>;

    private constructor(args: Array<string>) {
        this.args = args;
        this.program.version('1.1.0').description('CLI for alignment biological sequences');
    }

    static of(args: Array<string>): CommandBuilder {
        return new CommandBuilder(args);
    }

    createAlignCommand(executor: (input: ProgramInput) => void): CommandBuilder {
        this.program
            .command('align <first-file-path> [second-file-path]')
            .description('Aligns two biological sequences')
            .option('--open-gap <openGap>', 'Open gap penalty (default = -10)')
            .option('--extend-gap <extendGap>', 'Extend gap penalty (default = -1)')
            .option('-o, --output <file>', 'Path to output file')
            .action((firstFilePath, secondFilePath, options: { [key: string]: string }) => {
                executor({
                    firstFilePath: firstFilePath as string,
                    secondFilePath: secondFilePath as string,
                    outputFilePath: options['output'],
                    gapOpen: options['openGap'] === undefined ? -10 : Number(options['openGap']),
                    gapExtend: options['extendGap'] === undefined ? -1 : Number(options['extendGap']),
                });
            });

        return this;
    }

    parse(): void {
        this.program.parse(this.args);
    }
}

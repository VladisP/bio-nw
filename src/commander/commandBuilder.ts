import { Command } from 'commander';
import { ProgramInput } from '../common/types';

export class CommandBuilder {
    private program = new Command();
    private readonly args: Array<string>;

    private constructor(args: Array<string>) {
        this.args = args;
        this.program.version('1.0.0').description('CLI for alignment biological sequences');
    }

    static of(args: Array<string>): CommandBuilder {
        return new CommandBuilder(args);
    }

    createAlignCommand(executor: (input: ProgramInput) => void): CommandBuilder {
        this.program
            .command('align <first-file-path> [second-file-path]')
            .description('Aligns two biological sequences')
            .option('-g, --gap <gap>', 'Gap Penalty')
            .option('-o, --output <file>', 'Path to output file')
            .action((firstFilePath, secondFilePath, options: { [key: string]: string }) => {
                executor({
                    firstFilePath: firstFilePath as string,
                    secondFilePath: secondFilePath as string,
                    outputFilePath: options['output'],
                    gap: Number(options['gap'])
                });
            });

        return this;
    }

    parse(): void {
        this.program.parse(this.args);
    }
}

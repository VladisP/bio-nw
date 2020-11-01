# Bioinformatics

CLI for alignment biological sequences by Needleman-Wunsch algorithm

## Install

- `npm i`
- `npm run build`
- `npm i -g`

## Usage

`bio-cli align [options] <first-file-path> [second-file-path]`

```
Options:
  -g, --gap <gap>      Gap Penalty
  -o, --output <file>  Path to output file
  --hirschberg         Uses Hirschberg's algorithm
  -h, --help           display help for command
```

## Run tests

`npm run test`

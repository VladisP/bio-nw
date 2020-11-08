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
  --open-gap <openGap>      Open gap penalty (default = -10)
  --extend-gap <extendGap>  Extend gap penalty (default = -1)
  -o, --output <file>       Path to output file
  -h, --help                Display help for command
```

## Run tests

`npm run test`

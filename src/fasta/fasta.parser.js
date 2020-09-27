const fasta = require('fasta-parser');
const fs = require('fs');

async function parseFasta(filePath) {
    if (!filePath) {
        return [];
    }

    return new Promise((resolve, reject) => {
        const rawData = fs.readFileSync(filePath).toString();
        const fastaData = Buffer.from(rawData);
        const fastaParser = fasta();

        const sequences = [];

        fastaParser.on('data', (data) => sequences.push(JSON.parse(data.toString())['seq']));
        fastaParser.on('error', reject);
        fastaParser.on('end', () => resolve(sequences));
        fastaParser.write(fastaData);
        fastaParser.end();
    });
}

module.exports = {
    parseFasta
};

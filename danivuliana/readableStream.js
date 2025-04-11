const fs = require('fs');

const readableStream = fs.createReadStream('sherlock-holmes.txt', 'utf8');

let spaceCount = 0;
let wordCount = 0;
let longWordCount = 0;
let doubleLetterWordCount = 0;

readableStream.on('data', chunk => {
    const text = chunk.toString();
    spaceCount += (text.match(/\s/g) || []).length;

    const words = text.split(/\s+/);
    wordCount += words.length;

    words.forEach(word => {
        if (word.length > 5) {
            longWordCount++;
        }
    });

    words.forEach(word => {
        if (/(.)\1/.test(word)) {
            doubleLetterWordCount++;
        }
    });
});

readableStream.on('end', () => {
    console.log(`Кількість пробілів: ${spaceCount}`);
    console.log(`Кількість слів: ${wordCount}`);
    console.log(`Кількість слів довших за 5 символів: ${longWordCount}`);
    console.log(`Кількість слів з подвійними буквами: ${doubleLetterWordCount}`);
});

const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8");
const contents = input.split("");

const READ_LENGTH = 4;

let numChars = READ_LENGTH;
let lastChars = contents.splice(0, READ_LENGTH);
while (new Set(lastChars).size < READ_LENGTH) {
  numChars++;
  lastChars = lastChars.concat(contents.splice(0, 1)).splice(-READ_LENGTH);
}

console.log(numChars); // 1987

const { readFileSync } = require("fs");

const contents = readFileSync("./input.txt", "utf-8");
const inputContents = contents.split("\n\n");
let highestTotal = 0;
inputContents.forEach((elf) => {
  const currentTotal = elf
    .split("\n")
    .reduce((totalCal, cal) => totalCal + parseInt(cal), 0);
  if (highestTotal < currentTotal) {
    highestTotal = currentTotal;
  }
});

console.log(highestTotal); // 69310

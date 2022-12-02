const { readFileSync } = require("fs");

const contents = readFileSync("./input.txt", "utf-8");
const inputContents = contents.split("\n\n");
const highestTotals = [0, 0, 0];
inputContents.forEach((elf) => {
  const currentTotal = elf
    .split("\n")
    .reduce((totalCal, cal) => totalCal + parseInt(cal), 0);
  highestTotals.sort((a, b) => a - b);
  if (highestTotals[0] < currentTotal) {
    highestTotals[0] = currentTotal;
  }
});

console.log(highestTotals.reduce((sum, val) => sum + val, 0)); // 206104

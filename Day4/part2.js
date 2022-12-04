const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8");
const contents = input.split("\n");

const result = contents.reduce((count, row) => {
  const elfRanges = row.split(",").map((elf) => getRange(elf));
  return isContainedIn(elfRanges[0], elfRanges[1]) ? ++count : count;
}, 0);

function getRange(elf) {
  return elf.split("-").map((val) => parseInt(val));
}
function isContainedIn(rangeA, rangeB) {
  return (
    (rangeA[0] >= rangeB[0] && rangeA[0] <= rangeB[1]) ||
    (rangeA[1] >= rangeB[0] && rangeA[1] <= rangeB[1]) ||
    (rangeB[0] >= rangeA[0] && rangeB[0] <= rangeA[1]) ||
    (rangeB[1] >= rangeA[0] && rangeB[1] <= rangeA[1])
  );
}

console.log(result); // 888

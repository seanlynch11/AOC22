const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8");
const [inputStacks, inputMoves] = input.split("\n\n");

const parsedStacks = transpose(
  inputStacks
    .replace(/    /g, " [ ]")
    .split("\n")
    .map((row) => row.padEnd(35, " [ ]").substring(1, 34).split("] ["))
    .reverse()
    .splice(1)
).map((stack) => stack.filter((val) => val != " "));

const parsedMoves = inputMoves.split("\n").map((row) => row.match(/\d+/g));

parsedMoves.forEach((move, i) => {
  parsedStacks[move[2] - 1].push(...parsedStacks[move[1] - 1].splice(-move[0]));
});

const result = parsedStacks.reduce((finalString, stack) => {
  return finalString + stack.splice(-1);
}, "");

console.log(result); // GMPMLWNMG

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

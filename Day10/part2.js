const { readFileSync } = require("fs");

let cycle = 0;
let spriteLocation = 1;
let screen = [];
readFileSync("./input.txt", "utf-8")
  .split("\n")
  .reduce((row, instruction) => {
    [command, param] = instruction.split(" ");
    switch (command) {
      case "noop":
        row = writePixel(row);
        break;
      case "addx":
        row = writePixel(row);
        row = writePixel(row);
        spriteLocation += parseInt(param);
        break;
    }

    return row;
  }, "");

screen.forEach((row) => console.log(row)); // PZULBAUA
/*
 *  ###..####.#..#.#....###...##..#..#..##..
 *  #..#....#.#..#.#....#..#.#..#.#..#.#..#.
 *  #..#...#..#..#.#....###..#..#.#..#.#..#.
 *  ###...#...#..#.#....#..#.####.#..#.####.
 *  #....#....#..#.#....#..#.#..#.#..#.#..#.
 *  #....####..##..####.###..#..#..##..#..#.
 */

// Helpers
function getPixel(cycle, spriteLocation) {
  return Math.abs(cycle - spriteLocation) < 2 ? "#" : ".";
}

function writePixel(row) {
  row += getPixel(cycle, spriteLocation);
  if (isEndOfRow()) {
    advanceRow(row);
    row = "";
  }
  return row;
}

function isEndOfRow() {
  return !(++cycle % 40);
}

function advanceRow(row) {
  screen.push(row);
  cycle = 0;
}

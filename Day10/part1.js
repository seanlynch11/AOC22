const { readFileSync } = require("fs");

const KEY_CYCLES = [20, 60, 100, 140, 180, 220];

let cycle = 1;
let currentTotal = 1;
const total = readFileSync("./input.txt", "utf-8")
  .split("\n")
  .reduce((total, instruction) => {
    [command, param] = instruction.split(" ");
    switch (command) {
      case "noop":
        total += KEY_CYCLES.includes(++cycle) ? currentTotal * cycle : 0;
        break;
      case "addx":
        total += KEY_CYCLES.includes(++cycle) ? currentTotal * cycle : 0;
        currentTotal += parseInt(param);
        total += KEY_CYCLES.includes(++cycle) ? currentTotal * cycle : 0;
        break;
    }
    return total;
  }, 0);

console.log(total); // 11780

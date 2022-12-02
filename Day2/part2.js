const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8");
const contents = input.split("\n");

points = {
  A: {
    X: 3 + 0,
    Y: 1 + 3,
    Z: 2 + 6,
  },
  B: {
    X: 1 + 0,
    Y: 2 + 3,
    Z: 3 + 6,
  },
  C: {
    X: 2 + 0,
    Y: 3 + 3,
    Z: 1 + 6,
  },
};

const result = contents.reduce(
  (sum, round) => sum + points[round[0]][round[2]],
  0
);

console.log(result); // 10498

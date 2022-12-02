const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8");
const contents = input.split("\n");

points = {
  A: {
    X: 1 + 3,
    Y: 2 + 6,
    Z: 3 + 0,
  },
  B: {
    X: 1 + 0,
    Y: 2 + 3,
    Z: 3 + 6,
  },
  C: {
    X: 1 + 6,
    Y: 2 + 0,
    Z: 3 + 3,
  },
};

const result = contents.reduce(
  (sum, round) => sum + points[round[0]][round[2]],
  0
);

console.log(result); // 14297

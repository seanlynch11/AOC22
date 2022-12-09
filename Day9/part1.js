const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8");
const contents = input.split("\n");

const visited = new Set().add("0|0");

let head = [0, 0];
let tail = [0, 0];

contents.forEach((movement) => {
  const [direction, distance] = movement.split(" ");
  for (i = 0; i < parseInt(distance); i++) {
    const newHead = getNewHead(direction);
    if (isFar(newHead)) {
      visited.add(head.join("|"));
      tail = head;
    }
    head = newHead;
  }
});

console.log(visited.size); // 6057

// Helpers
function getNewHead(direction) {
  switch (direction) {
    case "R":
      return [head[0] + 1, head[1]];
    case "U":
      return [head[0], head[1] + 1];
    case "L":
      return [head[0] - 1, head[1]];
    case "D":
      return [head[0], head[1] - 1];
  }
}

function isFar(newHead) {
  return newHead.some((headLoc, i) => Math.abs(headLoc - tail[i]) >= 2);
}

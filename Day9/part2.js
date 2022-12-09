const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8");
const contents = input.split("\n");

const visited = new Set().add("0|0");

const size = 10;
const rope = Array(size).fill([0, 0]);

contents.forEach((movement) => {
  const [direction, distance] = movement.split(" ");
  for (i = 0; i < parseInt(distance); i++) {
    let segmentAhead = getNewHead(direction);
    let lastLocation = rope[0];
    rope.forEach((segment, segmentNum) => {
      if (segmentNum == 0) {
        lastLocation = rope[segmentNum];
        rope[segmentNum] = segmentAhead;
      } else if (isFar(segmentAhead, segment)) {
        const newLocation = getNewLocation(lastLocation, segment, segmentAhead);
        if (segmentNum == size - 1) {
          visited.add(newLocation.join("|"));
        }
        lastLocation = segment;
        rope[segmentNum] = newLocation;
      }
      segmentAhead = rope[segmentNum];
    });
  }
});

console.log(visited.size); // 2514

// Helpers
function getNewHead(direction) {
  switch (direction) {
    case "R":
      return [rope[0][0] + 1, rope[0][1]];
    case "U":
      return [rope[0][0], rope[0][1] + 1];
    case "L":
      return [rope[0][0] - 1, rope[0][1]];
    case "D":
      return [rope[0][0], rope[0][1] - 1];
  }
}

function getNewLocation(lastLocation, segment, segmentAhead) {
  let dx = segmentAhead[0] - lastLocation[0];
  let dy = segmentAhead[1] - lastLocation[1];

  const isSameRowOrCol = segmentAhead.some((val, i) => val == segment[i]);
  if (isSameRowOrCol) {
    return segment.map((val, i) => avg(segmentAhead[i], segment[i]));
  } else if (dx && dy) {
    return [segment[0] + dx, segment[1] + dy];
  } else {
    return lastLocation;
  }
}

function isFar(segmentAhead, segment) {
  return segmentAhead.some((headLoc, i) => Math.abs(headLoc - segment[i]) >= 2);
}

function avg(a, b) {
  return (a + b) / 2;
}

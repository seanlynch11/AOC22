const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8");
const contents = input.split("\n").map((row) => row.split(""));

const propDeltas = {
  up: {
    row: -1,
    col: 0,
  },
  down: {
    row: 1,
    col: 0,
  },
  right: {
    row: 0,
    col: 1,
  },
  left: {
    row: 0,
    col: -1,
  },
};

const matrix = contents.map((row) =>
  row.map((val) => ({
    height: parseInt(val),
    up: undefined,
    down: undefined,
    left: undefined,
    right: undefined,
  }))
);

const finalScore = matrix.reduce((highestScore, row, rowNum) => {
  const highestInRow = row.reduce((highestInRow, tree, colNum) => {
    let treeScore =
      setDist(rowNum, colNum, "up", 0, tree) *
      setDist(rowNum, colNum, "down", 0, tree) *
      setDist(rowNum, colNum, "left", 0, tree) *
      setDist(rowNum, colNum, "right", 0, tree);

    return Math.max(highestInRow, treeScore);
  }, 0);

  return Math.max(highestScore, highestInRow);
}, 0);

console.log(finalScore); // 335580

// Helpers
function getTree(rowNum, colNum) {
  if (
    rowNum >= 0 &&
    colNum >= 0 &&
    matrix.length > rowNum &&
    matrix[rowNum].length > colNum
  ) {
    return matrix[rowNum][colNum];
  } else {
    return undefined;
  }
}

function setDist(rowNum, colNum, prop, dist, originalTree) {
  const tree = getTree(rowNum, colNum);
  if (originalTree[prop] == undefined) {
    const nextCol = colNum + propDeltas[prop].col;
    const nextRow = rowNum + propDeltas[prop].row;
    const nextTree = getTree(nextRow, nextCol);
    if (nextTree) {
      dist += 1;
      if (nextTree.height < originalTree.height) {
        setDist(nextRow, nextCol, prop, dist, originalTree);
      } else {
        originalTree[prop] = dist;
      }
    } else {
      originalTree[prop] = dist;
    }
  }

  return originalTree[prop];
}

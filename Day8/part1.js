const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8");
const contents = input.split("\n").map((row) => row.split(""));

const propDeltas = {
  upMax: {
    row: -1,
    col: 0,
  },
  downMax: {
    row: 1,
    col: 0,
  },
  rightMax: {
    row: 0,
    col: 1,
  },
  leftMax: {
    row: 0,
    col: -1,
  },
};

const matrix = contents.map((row) =>
  row.map((val) => ({
    height: parseInt(val),
    upMax: -1,
    downMax: -1,
    leftMax: -1,
    rightMax: -1,
  }))
);

const total = matrix.reduce(
  (matrixTotal, row, rowNum) =>
    matrixTotal +
    row.reduce((rowTotals, tree, colNum) => {
      const min = Math.min(
        setMax(rowNum, colNum, "upMax"),
        setMax(rowNum, colNum, "downMax"),
        setMax(rowNum, colNum, "rightMax"),
        setMax(rowNum, colNum, "leftMax")
      );
      if (min < tree.height) {
        rowTotals++;
      }
      return rowTotals;
    }, 0),
  0
);

console.log(total); // 1827

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

function setMax(rowNum, colNum, prop) {
  const tree = getTree(rowNum, colNum);
  if (tree[prop] == -1) {
    const nextCol = colNum + propDeltas[prop].col;
    const nextRow = rowNum + propDeltas[prop].row;
    const nextTree = getTree(nextRow, nextCol);
    if (nextTree) {
      tree[prop] = Math.max(nextTree.height, setMax(nextRow, nextCol, prop));
    }
  }

  return tree[prop];
}

const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8");
const contents = input.split("\n");

const root = {
  size: 0,
  parentDir: undefined,
  children: {},
};
contents.forEach((line) => {
  if (/^\$ cd/.test(line)) {
    cd(line);
  } else if (/^\d+/.test(line)) {
    file(line);
  }
});

dfsTree(root, addChildToParent);

let deletionSize = root.size;
const SPACE_REQUIRED = 30000000;
const TOTAL_SPACE = 70000000;
const additionalSpaceRequired = SPACE_REQUIRED - (TOTAL_SPACE - root.size);
dfsTree(root, sizeAboveThreshold);

console.log(deletionSize); // 5649896

function sizeAboveThreshold(parent, child) {
  if (child.size >= additionalSpaceRequired && child.size < deletionSize) {
    deletionSize = child.size;
  }
}

function addChildToParent(parent, child) {
  parent.size += child.size;
}

function dfsTree(parent, callback) {
  Object.values(parent.children).forEach((child) => {
    callback(parent, dfsTree(child, callback));
  });
  return parent;
}

function file(line) {
  currentDir.size += parseInt(line.match(/\d+/g)[0]);
}

function cd(line) {
  const directoryInput = line.substring(5);

  if (directoryInput == "..") {
    currentDir = currentDir.parentDir;
  } else if (directoryInput == "/") {
    currentDir = root;
  } else {
    if (!currentDir.children[directoryInput]) {
      currentDir.children[directoryInput] = {
        size: 0,
        parentDir: currentDir,
        children: {},
      };
    }
    currentDir = currentDir.children[directoryInput];
  }
}

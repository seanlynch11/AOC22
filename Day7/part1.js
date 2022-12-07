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

let total = 0;
dfsTree(root, sumUnderThreshhold);

console.log(total); // 1077191

function sumUnderThreshhold(parent, child) {
  if (child.size <= 100000) {
    total += child.size;
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

const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8");
const contents = input.split("\n");

const CHAR_CODE_POINTS_OFFSET_LOWERCASE = 96;
const CHAR_CODE_POINTS_OFFSET_UPPERCASE = 38;

function getItemPriorty(itemType) {
  return (
    itemType.charCodeAt() -
    (itemType >= "a"
      ? CHAR_CODE_POINTS_OFFSET_LOWERCASE
      : CHAR_CODE_POINTS_OFFSET_UPPERCASE)
  );
}

function findDuplicateItem([compartmentA, compartmentB]) {
  return Array.from(new Set(compartmentA)).find((itemType) =>
    compartmentB.includes(itemType)
  );
}

function getCompartments(sack) {
  return [sack.substring(-sack.length / 2), sack.substring(sack.length / 2)];
}

function getTotalPriority(sacks) {
  return sacks.reduce((points, sack) => {
    return points + getItemPriorty(findDuplicateItem(getCompartments(sack)));
  }, 0);
}

console.log(getTotalPriority(contents)); // 8176

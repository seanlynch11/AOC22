const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8");

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

function findDuplicateItemFromGroup([sackA, sackB, sackC]) {
  return Array.from(new Set(sackA)).find(
    (itemType) => sackB.includes(itemType) && sackC.includes(itemType)
  );
}

function getGroups(input) {
  const regex = /(?:^.*\n?){3}/gm; // Matches a group of {3} iterations of any number of characters which end with '\n'
  return input.match(regex).map((group) => group.split("\n", 3));
}

function getTotalPriority(input) {
  return getGroups(input).reduce((points, sacks) => {
    return points + getItemPriorty(findDuplicateItemFromGroup(sacks));
  }, 0);
}

console.log(getTotalPriority(input)); // 2689

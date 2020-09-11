// implement file reader from node to read input-1.txt
// Create variables for directions

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input-1.txt`).toString();
const data = input.split(', ');
const actionRegex = /^(L|R)([0-9]+)$/; // LEFT OR RIGHT, DIGITS 0-9

const DIRECTIONS = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
};

const { horizontal, vertical } = data.reduce( //reduce adds up all the instances
  (state, action) => {
    const info = action.match(actionRegex);

    if (info === null) {
      throw new Error(`Action did not match regexp: ${action}`);
    } // incase you dont have any data to collect!

    // BREAK DOWN DATA IN ARRAY ex.[L, 4]
    const turn = info[1]; // RIGHT OR LEFT
    const moves = Number(info[2]); // HOW MANY MOVES YOU MAKE

    const direction = (4 + state.direction + (turn === 'L' ? -1 : 1)) % 4; // if LEFT -1, else +1   divide the function by 4 then assign remainder to the direction
    const dHorizontal =
      (direction === DIRECTIONS.EAST
        ? 1
        : direction === DIRECTIONS.WEST
        ? -1
        : 0) * moves;
    const dVeritcal =
      (direction === DIRECTIONS.NORTH
        ? 1
        : direction === DIRECTIONS.SOUTH
        ? -1
        : 0) * moves;

    const horizontal = state.horizontal + dHorizontal; // add new moves to original state
    const vertical = state.vertical + dVeritcal; // add new moves to original state

    return Object.assign(state, { horizontal, vertical, direction });
  },
  { horizontal: 0, vertical: 0, direction: DIRECTIONS.NORTH }
);
//added comment
console.log(Math.abs(horizontal) + Math.abs(vertical)); // abs === absolute value (no negative numbers)

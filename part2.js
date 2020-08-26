// implement file reader from node to read input-1.txt
// Create variables for directions

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input-1.txt`).toString();
const data = input.split(', ');
const actionRegex = /^(L|R)([0-9]+)$/;

const DIRECTIONS = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
};

const { first, visits } = data.reduce( //takes the sum of all and puts out a single nominator
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
      direction === DIRECTIONS.EAST
        ? 1
        : direction === DIRECTIONS.WEST
        ? -1
        : 0; // same as part one besides mulipling moves
    const dVertical =
      direction === DIRECTIONS.NORTH
        ? 1
        : direction === DIRECTIONS.SOUTH
        ? -1
        : 0; // same as part one besides mulipling moves

    let visits = state.visits;
    let first = state.first;
    let vertical = state.vertical;
    let horizontal = state.horizontal;

    for (let i = 0; i < moves; i++) {
      horizontal += dHorizontal;
      vertical += dVertical;

      const visit = `${vertical}, ${horizontal}`;
      first = visits.indexOf(visit) > -1 && first === null ? visit : first; // specific index of the visit

      visits.push(visit); // push on to the end of visit array
    }

    return Object.assign(state, {
      horizontal,
      vertical,
      direction,
      visits,
      first,
    });
  },
  {
    horizontal: 0,
    vertical: 0,
    direction: DIRECTIONS.NORTH,
    visits: [`0, 0`],
    first: null,
  }
);

const distance = first
  .split(', ')
  .map(Number)
  .reduce((total, value) => total + value, 0);

console.log(Math.abs(distance)); // Math.abs() for no negative numbers!

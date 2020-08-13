// implement file reader from node to read input-1.txt
// Create variables for directions




const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input-1.txt`).toString(); 
const data = input.split(', ');
const actionRegex =  /^(L|R)([0-9]+)$/;  // LEFT OR RIGHT, DIGITS 0-9, 



const DIRECTIONS = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
};

const { horizontal, vertical } = data.reduce((state, action) => {
    const info = action.match(actionRegex);

    if (info === null) {
        throw new Error(`Action did not match regexp: ${action}`);
    }

    const turn = info[1];
    const moves = Number(info[2]);

    const direction = (4 + state.direction + (turn === 'L' ? -1 : 1)) % 4; 
    const dHorizontal = (direction === DIRECTIONS.RIGHT ? 1 : (direction === DIRECTIONS.LEFT ? -1 : 0)) * moves;
    const dVeritcal = (direction === DIRECTIONS.UP ? 1 : (direction === DIRECTIONS.DOWN ? -1 : 0)) * moves;

    const horizontal = state.horizontal + dHorizontal;
    const vertical = state.vertical + dVeritcal;

    return Object.assign(state, { horizontal, vertical, direction });
}, { horizontal: 0, vertical: 0, direction: DIRECTIONS.UP });

console.log(Math.abs(horizontal) + Math.abs(vertical));
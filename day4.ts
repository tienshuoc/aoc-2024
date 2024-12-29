import * as fs from 'fs';

const filePath: string = './inputs/day4_input.txt';
const data = fs.readFileSync(filePath, 'utf-8').trim();
const lines = data.split('\n');

let charArray: string[][] = [];
for (const line of lines) {
  charArray.push(line.split(''));
}

function walkCoordsAndFind(charArray: string[][], x_coord: number, y_coord: number, x_delta: number, y_delta: number, charsToFind: string[]): boolean {
  const arrayWidth = charArray[0].length;
  const arrayHeight = charArray.length;
  for (let char of charsToFind) {
    x_coord += x_delta;
    y_coord += y_delta;
    if (x_coord < 0 || x_coord >= arrayWidth || y_coord < 0 || y_coord >= arrayHeight)
      return false;
    if (charArray[y_coord][x_coord] != char)
      return false;
  }
  return true;
}

// Part 1
{
  let xmasCount: number = 0;
  for (let j: number = 0; j < charArray.length; ++j) {
    for (let k: number = 0; k < charArray[0].length; ++k) {
      if (charArray[j][k] === "X") {
        // top left
        xmasCount += Number(walkCoordsAndFind(charArray, k, j, -1, 1, ["M", "A", "S"]));
        // top
        xmasCount += Number(walkCoordsAndFind(charArray, k, j, 0, 1, ["M", "A", "S"]));
        // top right
        xmasCount += Number(walkCoordsAndFind(charArray, k, j, 1, 1, ["M", "A", "S"]));
        // right
        xmasCount += Number(walkCoordsAndFind(charArray, k, j, 1, 0, ["M", "A", "S"]));
        // bottom right
        xmasCount += Number(walkCoordsAndFind(charArray, k, j, 1, -1, ["M", "A", "S"]));
        // bottom
        xmasCount += Number(walkCoordsAndFind(charArray, k, j, 0, -1, ["M", "A", "S"]));
        // bottom left
        xmasCount += Number(walkCoordsAndFind(charArray, k, j, -1, -1, ["M", "A", "S"]));
        // left
        xmasCount += Number(walkCoordsAndFind(charArray, k, j, -1, 0, ["M", "A", "S"]));
      }
    }
  }

  console.log(xmasCount);
}

// Part 2
{
  let xMasCount: number = 0;
  for (let j: number = 0; j < charArray.length; ++j) {
    for (let k: number = 0; k < charArray[0].length; ++k) {
      if (charArray[j][k] === "A") {
        xMasCount += Number(
          // top left to bottom right slash
          ((walkCoordsAndFind(charArray, k, j, -1, 1, ["M"]) && walkCoordsAndFind(charArray, k, j, 1, -1, ["S"])) || (walkCoordsAndFind(charArray, k, j, -1, 1, ["S"]) && walkCoordsAndFind(charArray, k, j, 1, -1, ["M"]))) &&
          // top right to bottom left slash
          ((walkCoordsAndFind(charArray, k, j, 1, 1, ["M"]) && walkCoordsAndFind(charArray, k, j, -1, -1, ["S"])) || (walkCoordsAndFind(charArray, k, j, 1, 1, ["S"]) && walkCoordsAndFind(charArray, k, j, -1, -1, ["M"])))
        )
      }
    }
  }
  console.log(xMasCount);
}

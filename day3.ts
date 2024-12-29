import * as fs from 'fs';

const filePath: string = './inputs/day3_input.txt';
const data = fs.readFileSync(filePath, 'utf-8').trim();

// Part 1
{
  // Regular expression to find "mul" followed by numerical content in parentheses
  const regex = /mul\((\d+(?:,\d+)*)\)/g

  let match;
  const results: number[][] = [];
  let mulSum: number = 0;

  while ((match = regex.exec(data)) !== null) {
    // match[1] contains the content inside the parentheses
    const values = match[1].split(',').map(value => value.trim()); // Split by comma and trim spaces

    // Validate that all values are numbers
    const validValues = values.filter(value => !isNaN(Number(value))).map(Number); // Only keep valid numbers

    if (validValues.length === values.length) {
      mulSum += (validValues.reduce((product, currentValue) => product * currentValue, 1))
    }

  }
  console.log(mulSum);
}

// Part 2
{
  let match;
  let isEnabled: boolean = true;
  let mulSum: number = 0;
  const regex = /(mul\((\d+,\d+)\))|(do\(\))|(don't\(\))/g;
  while ((match = regex.exec(data)) !== null) {
    if (match[2] && (isEnabled === true)) {
      const values = match[2].split(',').map(value => value.trim()); // Split by comma and trim spaces
      const validValues = values.filter(value => !isNaN(Number(value))).map(Number); // Only keep valid numbers
      if (validValues.length === values.length) {
        mulSum += (validValues.reduce((product, currentValue) => product * currentValue, 1))
      }
    }
    else if (match[3]) { // Found a do() instruction.
      isEnabled = true;
    }
    else if (match[4]) { // Found a don't() instruction.
      isEnabled = false;
    }
  }
  console.log(mulSum);
}

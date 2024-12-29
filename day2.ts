import * as fs from 'fs';

function levelsAreSafe(levels: number[]): boolean {
  let isIncreasing: boolean = true;
  let isDecreasing: boolean = true;
  for (let i: number = 0; i < levels.length - 1; ++i) {
    const levelsDiff: number = Math.abs(levels[i] - levels[i + 1]);
    if (levelsDiff < 1 || levelsDiff > 3) {
      return false;
    }
    if (levels[i] < levels[i + 1])
      isDecreasing = false;
    else if (levels[i] > levels[i + 1])
      isIncreasing = false;

    if (!(isDecreasing || isIncreasing))
      return false;
  }
  return true;
}

const filePath = './inputs/day2_input.txt';
const data = fs.readFileSync(filePath, 'utf-8').trim();

const lines = data.split('\n');

// Part 1
{
  let safeReports: number = 0;
  for (const line of lines) {
    const values = line.trim().split(/\s+/); // Split by whitespace
    safeReports += levelsAreSafe(values.map(Number)) ? 1 : 0;
  }
  console.log(safeReports)
}

function safeWithDampener(levels: number[]): boolean {
  for (let i: number = 0; i < levels.length; ++i) {
    const ModifiedLevels: number[] = [...levels.slice(0, i), ...levels.slice(i + 1)];
    if (levelsAreSafe(ModifiedLevels))
      return true;
  }
  return false;
}

// Part 2
{
  let safeReports: number = 0;
  for (const line of lines) {
    const levels = (line.trim().split(/\s+/)).map(Number); // Split by whitespace
    safeReports += (safeWithDampener(levels)) ? 1 : 0;
  }
  console.log(safeReports);
}

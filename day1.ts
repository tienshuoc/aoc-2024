import * as fs from 'fs';

// Function to read a file and store numbers in two separate arrays
function readTwoColumns(filePath: string): { column1: number[]; column2: number[] } {
  // Read the file content
  const data = fs.readFileSync(filePath, 'utf-8');

  // Initialize arrays for the two columns
  const column1: number[] = [];
  const column2: number[] = [];

  // Split the content into lines and process each line
  const lines = data.split('\n');
  for (const line of lines) {
    const values = line.trim().split(/\s+/); // Split by whitespace
    if (values.length === 2) {
      // Parse the numbers and add them to respective columns
      const num1 = parseFloat(values[0]);
      const num2 = parseFloat(values[1]);
      if (!isNaN(num1) && !isNaN(num2)) {
        column1.push(num1);
        column2.push(num2);
      }
    }
  }

  return { column1, column2 };
}

// Part 1
{
  const filePath = './inputs/day1_input.txt'; // Path to your text file
  const { column1: left_list, column2: right_list } = readTwoColumns(filePath);
  left_list.sort()
  right_list.sort()
  let total_diff = 0;
  for (let i = 0; i < left_list.length; ++i) {
    total_diff += Math.abs(left_list[i] - right_list[i])
  }
  console.log(total_diff)
}

// Part 2
{
  const filePath = './day1_input.txt'; // Path to your text file
  const { column1: left_list, column2: right_list } = readTwoColumns(filePath);
  // Build hashmap with <number, apperance_count> pairs from right_list.
  let right_list_counts = new Map();
  for (let i = 0; i < right_list.length; ++i) {
    let element: number = right_list[i];
    let current_count: number = right_list_counts.get(element);
    if (undefined == current_count)
      right_list_counts.set(element, 1);
    else
      right_list_counts.set(element, current_count + 1);
  }
  // Walk through left and calculate similarity score.
  let similarityScore: number = 0;
  for (let i: number = 0; i < left_list.length; ++i) {
    let element: number = left_list[i];
    if (right_list_counts.has(element))
      similarityScore += (right_list_counts.get(element) * element);
  }
  console.log(similarityScore);
}

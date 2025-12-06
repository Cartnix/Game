export const TestCaseArray = [
    { input: [3, 3], expected: 6 },
    { input: [0, 0], expected: 0 },
    { input: [-1, 3,], expected: 2 },
    { input: [5, 1], expected: 6 },
    { input: [4, 2], expected: 6 },
];

export const MaximumInArrayTests = [
  { input: [1, 3, 2, 5, 4], expected: 5 },
  { input: [-1, -3, -2], expected: -1 },
  { input: [10], expected: 10 },
  { input: [0, 0, 0], expected: 0 },
  { input: [5, 5, 5, 2], expected: 5 },
];

export const PalindromeCheckTests = [
  { input: "racecar", expected: true },
  { input: "hello", expected: false },
  { input: "A man a plan a canal Panama", expected: true },
  { input: "Was it a car or a cat I saw", expected: true },
  { input: "12321", expected: true },
  { input: "Not a palindrome", expected: false },
];
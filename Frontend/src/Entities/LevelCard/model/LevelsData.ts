import { MaximumInArrayTests, PalindromeCheckTests, TestCaseArray } from "./TestCasesArray";

export const LevelsData = [
  {
    id: 1,
    title: 'Array Sum',
    difficult: 'Easy',
    scores: 250,
    technologies: ['array', 'iteration', 'basic math'],
    task:'У тебя есть массив целых чисел. Напиши функцию, которая возвращает сумму всех чисел в массиве.' ,
    testcases: TestCaseArray,
  },
  { 
    id: 2,
    title: 'Maximum in Array',
    difficult: 'Medium',
    scores: 400,
    technologies: ['array', 'iteration', 'comparison'],
    task: 'Дан массив чисел nums. Напишите функцию, которая возвращает наибольшее число в массиве.',
    testcases: MaximumInArrayTests,
  },
  {
    id: 3,
    title: 'Palindrome Check',
    difficult: 'Hard',
    scores: 600,
    technologies: ['string', 'two pointers', 'string manipulation'],
    task: 'Напишите функцию, которая проверяет, является ли строка s палиндромом. Палиндром — это строка, которая читается одинаково слева направо и справа налево. Игнорируйте пробелы и регистр букв.',
    testcases: PalindromeCheckTests,
  }
];

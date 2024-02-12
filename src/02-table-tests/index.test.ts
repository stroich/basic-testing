import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 13, b: 7, action: Action.Subtract, expected: 6 },
  { a: 14, b: 2, action: Action.Divide, expected: 7 },
  { a: 32, b: 8, action: Action.Divide, expected: 4 },
  { a: 10, b: 3, action: Action.Multiply, expected: 30 },
  { a: 4, b: 3, action: Action.Multiply, expected: 12 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 4, b: 3, action: Action.Exponentiate, expected: 64 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return correct result for addition',
    ({ a, b, action, expected }) => {
      const rawInput = { a, b, action };
      const result = simpleCalculator(rawInput);
      expect(result).toEqual(expected);
    },
  );
});

import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rawInput = {
      a: 5,
      b: 8,
      action: Action.Add,
    };
    expect(simpleCalculator(rawInput)).toBe(13);
  });

  test('should subtract two numbers', () => {
    const rawInput = {
      a: 8,
      b: 5,
      action: Action.Subtract,
    };
    expect(simpleCalculator(rawInput)).toBe(3);
  });

  test('should multiply two numbers', () => {
    const rawInput = {
      a: 5,
      b: 5,
      action: Action.Multiply,
    };
    expect(simpleCalculator(rawInput)).toBe(25);
  });

  test('should divide two numbers', () => {
    const rawInput = {
      a: 30,
      b: 5,
      action: Action.Divide,
    };
    expect(simpleCalculator(rawInput)).toBe(6);
  });

  test('should exponentiate two numbers', () => {
    const rawInput = {
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    };
    expect(simpleCalculator(rawInput)).toBe(8);
  });

  test('should return null for invalid action', () => {
    const rawInput = {
      a: 2,
      b: 3,
      action: 'invalid',
    };
    expect(simpleCalculator(rawInput)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const rawInput = {
      a: 'a',
      b: 3,
      action: Action.Add,
    };
    expect(simpleCalculator(rawInput)).toBeNull();
  });
});

import { generateLinkedList } from './index';

const inputValues = [1, 2, 3];

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(generateLinkedList(inputValues)).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(inputValues)).toMatchSnapshot();
  });
});
